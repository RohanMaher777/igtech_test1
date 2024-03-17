module.exports = (sequelize, DataTypes) => {
    const pdf_content = sequelize.define("pdf_content", {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pdf_path : {
            type : DataTypes.STRING,
            allowNull : false
        },
        deleted_At: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    },
        {
            paranoid: true,
            timestamps: true,
            deletedAt: 'deleted_At'
        }
    )

    return pdf_content
}