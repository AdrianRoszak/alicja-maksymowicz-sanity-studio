// @ts-expect-error :: There may be a problem with the types, but it's not a problem for us
export const structure = (S) =>
  S.list()
    .title('PANEL ADMINISTRACYJNY')
    .items([
      S.listItem()
        .id('home')
        .title('Strona główna')
        .child(S.document().schemaType('page_home').documentId('page_home')),
      S.listItem()
        .id('about-me')
        .title('O mnie')
        .child(
          S.document().schemaType('page_about_me').documentId('page_about_me'),
        ),
      S.listItem()
        .id('blog')
        .title('Strona bloga')
        .child(S.document().schemaType('page_blog').documentId('page_blog')),
      S.listItem()
        .id('contact')
        .title('Kontakt')
        .child(
          S.document().schemaType('page_contact').documentId('page_contact'),
        ),
      S.divider(),
      S.listItem()
        .id('courses')
        .title('Programy')
        .child(S.documentTypeList('course')),
      S.divider(),
      S.listItem().id('heroes').title('Hero').child(S.documentTypeList('hero')),
      S.listItem()
        .id('testimonials')
        .title('Opinie klientów')
        .child(S.documentTypeList('testimonial')),
      S.divider(),
      S.listItem()
        .id('posts')
        .title('Posty')
        .child(S.documentTypeList('blog_post')),
      S.listItem()
        .id('authors')
        .title('Autorzy')
        .child(S.documentTypeList('author_block')),
    ])
