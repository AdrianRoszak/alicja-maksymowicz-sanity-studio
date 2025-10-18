// @ts-expect-error :: There may be a problem with the types, but it's not a problem for us
export const structure = (S) =>
  S.list()
    .title('PANEL ADMINISTRACYJNY')
    .items([
      S.listItem().id('posts').title('Posty').child(S.documentTypeList('blog_post').title('Posty')),
    ])
