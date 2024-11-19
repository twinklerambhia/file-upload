const DataTypes= require('sequelize');
const sequelize = require('./config');



const Order= sequelize.define('Order',{
    orderId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    customerName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    source:{
        type:DataTypes.STRING,
        allowNull:false
    },
    destination:{
        type:DataTypes.STRING,
        allowNull:false
    },
    consignee:{
        type:DataTypes.STRING,
        allowNull:false
    },
    consigneePhone:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    remarkForConsignee:{
        type:DataTypes.STRING,
        allowNull:true
    },
    loadType:{
        type:DataTypes.STRING,
        allowNull:false
    },
    billToAddress:{
        type:DataTypes.STRING,
        allowNull:false
    },
    
    orderDateTime:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue: DataTypes.NOW,
    },
    scheduledDelivery:{
        type:DataTypes.DATE,
        allowNull:false
    },
    
    insuranceNumber:{
        type:DataTypes.STRING,
        allowNull:false
    },
    
    specialRemark:{
        type:DataTypes.STRING,
        allowNull:true
    }

});


module.exports=Order;
