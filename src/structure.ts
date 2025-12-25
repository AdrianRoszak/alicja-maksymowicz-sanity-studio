import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('PANEL ADMINISTRACYJNY')
    .items([
      S.listItem()
        .id('home')
        .title('Strona główna')
        .child(S.document().schemaType('page_home').documentId('page_home')),
      S.listItem()
        .id('about-me')
        .title('Strona O mnie')
        .child(
          S.document().schemaType('page_about_me').documentId('page_about_me'),
        ),
      S.listItem()
        .id('blog')
        .title('Strona Bloga')
        .child(S.document().schemaType('page_blog').documentId('page_blog')),
      S.listItem()
        .id('contact')
        .title('Strona Kontakt')
        .child(
          S.document().schemaType('page_contact').documentId('page_contact'),
        ),
      S.divider(),
      S.listItem()
        .id('courses')
        .title('Programy')
        .child(S.documentTypeList('course')),
      S.listItem()
        .id('posts')
        .title('Posty')
        .child(S.documentTypeList('blog_post')),
      S.divider(),
      S.listItem().id('heroes').title('Hero').child(S.documentTypeList('hero')),
      S.listItem()
        .id('testimonials')
        .title('Opinie klientów')
        .child(S.documentTypeList('testimonial')),
      S.listItem()
        .id('authors')
        .title('Autorzy')
        .child(S.documentTypeList('author_block')),
      S.listItem().id('faq').title('FAQ').child(S.documentTypeList('faq')),
      S.listItem()
        .id('gallery-blocks')
        .title('Galerie zdjęć')
        .child(S.documentTypeList('gallery_block')),
      S.listItem()
        .id('competencies')
        .title('Kompetencje')
        .child(S.documentTypeList('competency')),
      S.divider(),
      S.listItem()
        .id('templates')
        .title('IN PROGRESS: Szablony')
        .child(S.documentTypeList('benefits_block')),
      S.divider(),
      S.listItem()
        .id('company-data')
        .title('Dane firmy')
        .child(
          S.document().schemaType('company_data').documentId('company_data'),
        ),
    ])
