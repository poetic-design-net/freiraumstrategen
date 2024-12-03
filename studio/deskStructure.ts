import { type StructureResolver } from 'sanity/structure'
import {
  HomeIcon,
  DocumentsIcon,
  BookIcon,
  DocumentIcon,
  DocumentTextIcon,
  HelpCircleIcon,
  ControlsIcon,
  ComposeIcon,
  UsersIcon,
  CommentIcon
} from '@sanity/icons'

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Startseite')
        .icon(HomeIcon)
        .child(
          S.documentList()
            .title('Startseite')
            .filter('_type == "frontpage"')
        ),
      S.listItem()
        .title('Landing Pages')
        .icon(DocumentsIcon)
        .child(
          S.documentList()
            .title('Landing Pages')
            .filter('_type == "landingPage"')
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),
      S.listItem()
        .title('Blog')
        .icon(BookIcon)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Posts')
                .icon(DocumentTextIcon)
                .schemaType('post')
                .child(S.documentList().title('Posts').filter('_type == "post"')),
              S.listItem()
                .title('Kategorien')
                .icon(DocumentIcon)
                .schemaType('category')
                .child(
                  S.documentList().title('Kategorien').filter('_type == "category"')
                ),
            ])
        ),
      S.listItem()
        .title('Seiten')
        .icon(DocumentIcon)
        .child(
          S.documentList()
            .title('Seiten')
            .filter('_type == "page"')
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),
      S.listItem()
        .title('Testimonials')
        .icon(CommentIcon)
        .child(
          S.documentList()
            .title('Testimonials')
            .filter('_type == "testimonial"')
        ),
      S.listItem()
        .title('FAQ')
        .icon(HelpCircleIcon)
        .child(S.documentList().title('FAQ').filter('_type == "faq"')),
      S.listItem()
        .title('Rechtliches')
        .icon(ControlsIcon)
        .child(
          S.documentList()
            .title('Rechtliches')
            .filter('_type == "legal"')
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),
      S.listItem()
        .title('Navigation')
        .icon(ComposeIcon)
        .child(
          S.documentList()
            .title('Navigation')
            .filter('_type == "navigation"')
        ),
    ])
