// @ts-expect-error :: There may be a problem with the types, but it's not a problem for us
export const structure = (S) =>
  S.list()
    .title('PANEL ADMINISTRACYJNY')
    .items([
      S.listItem().id('posts').title('Blog').child(S.documentTypeList('blog_post').title('Posty')),
      S.listItem()
        .id('authors')
        .title('Autorzy')
        .child(S.documentTypeList('author').title('Autorzy')),
    ])
