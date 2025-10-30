// @ts-expect-error :: There may be a problem with the types, but it's not a problem for us
export const structure = (S) =>
  S.list()
    .title('PANEL ADMINISTRACYJNY')
    .items([
      S.listItem()
        .id('blog')
        .title('Strona bloga')
        .child(S.document().schemaType('page_blog').documentId('page_blog')),
      S.divider(),
      S.listItem().id('posts').title('Posty').child(S.documentTypeList('blog_post')),
      S.listItem().id('authors').title('Autorzy').child(S.documentTypeList('author_block')),
    ])
