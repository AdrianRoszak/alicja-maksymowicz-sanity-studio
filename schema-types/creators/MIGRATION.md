# Migration Guide: Improved Section Block

## Summary of Changes

### 🔧 What Changed

1. **Enums → Config Objects**: More maintainable and type-safe
2. **Separated Concerns**: Config in separate file
3. **Fixed Bug**: `reference` → `array` of references
4. **Better Types**: String literals instead of enums
5. **Added Documentation**: JSDoc comments and README

### 📦 File Structure

**Before:**
```
creators/
├── create-section-block.ts    (everything in one file)
└── index.ts
```

**After:**
```
creators/
├── section-block-config.ts         (configuration)
├── create-section-block.ts         (logic)
├── README.md                       (documentation)
├── MIGRATION.md                    (this file)
└── index.ts
```

## 🔄 Migration Steps

### Step 1: Update Imports

**Before:**
```typescript
import { createSectionBlock, ReferencesType, ItemsType } from '@schema/creators'
```

**After:**
```typescript
import { createSectionBlock } from '@schema/creators'
// Types are inferred, no need to import enums!
```

### Step 2: Update Usage

**Before:**
```typescript
createSectionBlock({
  hasExcerpt: true,
  referencesType: ReferencesType.TESTIMONIAL,
  itemsType: ItemsType.VALUE,
})
```

**After:**
```typescript
createSectionBlock({
  hasExcerpt: true,
  referencesType: 'TESTIMONIAL',  // String literal (autocomplete works!)
  itemsType: 'VALUE',
})
```

### Step 3: Replace Old File

1. Backup current `create-section-block.ts`
2. Rename `create-section-block.improved.ts` → `create-section-block.ts`
3. Add `section-block-config.ts` to the project
4. Update imports in consuming files

## 📝 Code Changes Required

### In `home.ts` (Example)

**Before:**
```typescript
import { createSectionBlock, ReferencesType } from '@schema/creators'

fields: createSectionBlock({
  hasExcerpt: true,
  referencesType: ReferencesType.TESTIMONIAL,
})
```

**After:**
```typescript
import { createSectionBlock } from '@schema/creators'

fields: createSectionBlock({
  hasExcerpt: true,
  referencesType: 'TESTIMONIAL',  // ✨ Better autocomplete!
})
```

## ✅ Verification Checklist

After migration, verify:

- [ ] All imports updated (no enum imports)
- [ ] All `ReferencesType.X` → `'X'`
- [ ] All `ItemsType.X` → `'X'`
- [ ] TypeScript compiles without errors
- [ ] Sanity Studio loads without errors
- [ ] All section blocks render correctly

## 🐛 Bug Fixes Included

### Critical: Reference Type Fix

**Before (Bug):**
```typescript
defineFieldWithDescription({
  name: 'section_block_references',
  type: 'reference',  // ❌ Wrong! Single reference
  to: [{ type: referencesType.toLowerCase() }],
})
```

**After (Fixed):**
```typescript
defineFieldWithDescription({
  name: 'section_block_references',
  type: 'array',  // ✅ Correct! Array of references
  of: [{ type: 'reference', to: [{ type: SECTION_REFERENCES[referencesType].schemaType }] }],
})
```

**Impact:** This fixes sections that should have multiple references but were limited to one.

## 🎯 Benefits

### Developer Experience
- ✅ Better autocomplete (string literals vs enums)
- ✅ Clearer error messages
- ✅ Self-documenting code (JSDoc)
- ✅ Easier to add new types

### Maintainability
- ✅ Configuration centralized
- ✅ No magic strings (`toLowerCase()`)
- ✅ Type-safe schema types
- ✅ Easier testing

### Code Quality
- ✅ Separation of concerns
- ✅ Better type inference
- ✅ Reduced coupling
- ✅ More explicit

## 🚨 Breaking Changes

### 1. Import Changes
```typescript
// ❌ No longer available
import { ReferencesType, ItemsType, Titles } from '@schema/creators'

// ✅ Only this is needed
import { createSectionBlock } from '@schema/creators'
```

### 2. Type Changes
```typescript
// ❌ Old way
referencesType: ReferencesType.COURSE

// ✅ New way
referencesType: 'COURSE'
```

### 3. Field Structure (Bug Fix)
If you were querying `section_block_references` as a single reference, you'll need to update your queries to handle arrays.

**Before (Bug):**
```groq
section_block_references-> {
  _id,
  title
}
```

**After (Fixed):**
```groq
section_block_references[]-> {
  _id,
  title
}
```

## 📞 Support

If you encounter issues during migration:
1. Check TypeScript errors first
2. Verify all enum usages are replaced
3. Review the README.md for usage examples
4. Check that schema types match config

## 🎓 Learning Resources

- See `README.md` for full documentation
- See `section-block-config.ts` for available types
- See `create-section-block.ts` for implementation details

