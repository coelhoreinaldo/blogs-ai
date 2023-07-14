const BlogPostSchema = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      },
      type: DataTypes.INTEGER,
      field: 'user_id',
    },
    published: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated: {
      allowNull: false,
      type: DataTypes.DATE,
    }
  },
    {
      underscored: true,
      tableName: 'blog_posts',
      timestamps: true,
      createdAt: 'published',
      updatedAt: 'updated'
    },
  );

  BlogPostTable.associate = ({ User }) => {
    BlogPostTable.belongsTo(User,
      { foreignKey: 'userId', as: 'users' })
  }

  return BlogPostTable;
}

module.exports = BlogPostSchema
