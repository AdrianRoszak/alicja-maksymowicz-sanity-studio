# Section Block Creator

A flexible utility for creating dynamic section blocks with configurable fields.

## 📁 File Organization

```
schema-types/creators/
├── README.md                          # This file - documentation
├── section-block-config.ts            # Configuration (types, titles, descriptions)
├── create-section-block.ts            # Main creator function
└── index.ts                           # Public exports
```

## 🎯 Design Principles

### 1. **Separation of Concerns**
- **Config file**: Manages available types, titles, and descriptions
- **Creator file**: Contains the logic for building fields
- **No mixing**: Configuration and logic are separate

### 2. **Type Safety**
- Use `const` objects with `satisfies` for type-safe configs
- String literal types instead of enums for better autocomplete
- No magic strings - all schema types are centralized

### 3. **Scalability**
- Adding new types: Just add to config file
- No changes needed in multiple places
- Self-documenting through TypeScript types

## 📝 Usage Examples

### Basic Section (Header Only)
```typescript
defineFieldWithDescription({
  name: 'my_section',
  type: 'object',
  fields: createSectionBlock(),
})
```

### Section with Excerpt
```typescript
fields: createSectionBlock({
  hasExcerpt: true
})
```

### Section with Items
```typescript
fields: createSectionBlock({
  hasExcerpt: true,
  itemsType: 'VALUE'  // TypeScript autocomplete available!
})
```

### Section with References
```typescript
fields: createSectionBlock({
  hasDescription: true,
  referencesType: 'TESTIMONIAL'
})
```

### Full Section
```typescript
fields: createSectionBlock({
  hasExcerpt: true,
  hasDescription: true,
  referencesType: 'COURSE'
})
```

## 🔧 Adding New Types

### Adding a New Item Type

1. **Add to config** (`section-block-config.ts`):
```typescript
export const SECTION_ITEMS = {
  // ... existing items
  FAQ: {
    schemaType: 'faq',
    title: 'FAQ',
    description: 'Dodaj pytania i odpowiedzi',
  },
} as const satisfies Record<string, SectionItemConfig>
```

2. **That's it!** TypeScript will automatically:
   - Add `'FAQ'` to autocomplete
   - Type-check all usages
   - Ensure the schema type exists

### Adding a New Reference Type

Same process, but in `SECTION_REFERENCES`:
```typescript
export const SECTION_REFERENCES = {
  // ... existing references
  PRODUCT: {
    schemaType: 'product',
    title: 'Produkty',
    description: 'Dodaj produkty',
  },
} as const satisfies Record<string, SectionReferenceConfig>
```

## ✅ Improvements Over Original

### Before (Original)
```typescript
export enum ReferencesType {
  COURSE = 'COURSE',
  TESTIMONIAL = 'TESTIMONIAL',
}

export enum Titles {
  COURSE = 'Programy',
  TESTIMONIAL = 'Opinie klientów',
}

// Usage - fragile!
type: referencesType.toLowerCase()  // ❌ Magic string transformation
title: Titles[referencesType]        // ❌ Separate enum for titles
```

**Problems:**
- ❌ Enums are harder to maintain
- ❌ Titles separated from types
- ❌ `toLowerCase()` is error-prone
- ❌ Type was `reference` instead of `array` (bug!)

### After (Improved)
```typescript
export const SECTION_REFERENCES = {
  COURSE: {
    schemaType: 'course',      // ✅ Exact schema type
    title: 'Programy',         // ✅ Title with type
    description: 'Dodaj...',   // ✅ Description included
  },
} as const

// Usage - type-safe!
type: SECTION_REFERENCES[referencesType].schemaType  // ✅ No transformation
title: SECTION_REFERENCES[referencesType].title      // ✅ Same object
```

**Benefits:**
- ✅ All related data in one place
- ✅ No string transformations
- ✅ Better autocomplete
- ✅ Fixed: Now correctly uses `array` type
- ✅ Easy to add new types

## 🐛 Bugs Fixed

1. **Reference Type Bug**: Changed from `type: 'reference'` to `type: 'array'` with references inside
2. **Type Safety**: No more `toLowerCase()` magic - explicit schema types
3. **Consistency**: Both items and references now use arrays

## 🚀 Future Enhancements

### Potential Additions:
```typescript
export type CreateSectionBlockOptions = {
  hasExcerpt?: boolean
  hasDescription?: boolean
  itemsType?: SectionItemType
  referencesType?: SectionReferenceType
  
  // Future additions:
  hasImage?: boolean           // Add hero image to section
  hasButton?: boolean          // Add CTA button
  maxItems?: number            // Limit array size
  requiredItems?: boolean      // Make items required
  layout?: 'grid' | 'list'    // Visual layout hint
}
```

## 📊 Comparison

| Aspect | Before | After |
|--------|--------|-------|
| Files | 1 | 3 (separated concerns) |
| Type Safety | Partial | Full |
| Maintainability | Medium | High |
| Scalability | Low | High |
| Documentation | None | JSDoc + README |
| Bug Risk | High (magic strings) | Low (explicit types) |
| DX | Medium | Excellent |

## 🎓 Best Practices

1. **Always use config objects** instead of enums for this pattern
2. **Separate configuration from logic** for better maintainability
3. **Use `as const satisfies`** for type-safe configs with inference
4. **Document with JSDoc** for better IDE tooltips
5. **Keep README updated** when adding new types

