const PostCategorySchema = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      field: 'post_id',
      references: {
        model: 'blog_posts',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id',
      references: {
        model: 'categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      primaryKey: true,
    },
  },
    {
      timestamps: false,
      underscored: true,
      tableName: 'posts_categories'
    },
  );

  PostCategoryTable.associate = ({ Category, BlogPost }) => {
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      through: PostCategoryTable,
      foreignKey: 'postId',
      otherKey: 'categoryId'
    })
    Category.belongsToMany(BlogPost, {
      as: 'blog_posts',
      through: PostCategoryTable,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    })
  }
  return PostCategoryTable;
}

module.exports = PostCategorySchema
