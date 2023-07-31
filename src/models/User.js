const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'display_name',
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
    {
      timestamps: false,
      underscored: true,
      tableName: 'users'
    },
  );

  UserTable.associate = ({ BlogPost }) => {
    UserTable.hasMany(BlogPost,
      { foreignKey: 'userId', as: 'blog_posts' })
  }

  return UserTable;
}

module.exports = UserSchema
