import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Titel',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Hoofdafbeelding',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'category',
            title: 'Categorie',
            type: 'string',
            options: {
                list: [
                    { title: 'Stucwerk', value: 'stucwerk' },
                    { title: 'Spackspuiten', value: 'spackspuiten' },
                    { title: 'Schilderwerk', value: 'schilderwerk' },
                    { title: 'Decoratief', value: 'decoratief' },
                    { title: 'Nieuwbouw', value: 'nieuwbouw' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'gallery',
            title: 'Galerij',
            type: 'array',
            of: [{ type: 'image' }],
        }),
        defineField({
            name: 'description',
            title: 'Beschrijving',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.max(300), // Approximate for "short description"
        }),
        defineField({
            name: 'date',
            title: 'Datum',
            type: 'date',
            options: {
                dateFormat: 'DD-MM-YYYY',
            },
            initialValue: () => new Date().toISOString().split('T')[0],
        }),
        defineField({
            name: 'beforeImage',
            title: 'Voor-situatie (Optioneel)',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
        },
    },
})
