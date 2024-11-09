export default {
  name: 'likes',
  title: 'Likes',
  type: 'document',
  fields: [
    {
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }]
    },
    {
      name: 'count',
      title: 'Count',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ]
}