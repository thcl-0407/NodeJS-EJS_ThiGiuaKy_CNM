const aws = require('aws-sdk')
const table_name = "MayTinhs"

aws.config.update({
    region: 'ap-southeast-1',
    endpoint: 'http://dynamodb.ap-southeast-1.amazonaws.com',
    accessKeyId: 'AKIAYAEJMCM4GDMOKBBA',
    secretAccessKey: '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'
})

const docClient = new aws.DynamoDB.DocumentClient()

function GetAllData(callback){
    let params = {
        TableName: table_name
    }

    docClient.scan(params, (error, data)=>{
        if(!error){
            callback(true ,data.Items)
        }else{
            callback(false, null)
        }
    })
}

function CreateItem(data, callback){
    let params = {
        TableName: table_name,
        Item:{
            ma_may: data.ma_may,
            ten: data.ten,
            gia: data.gia,
            hang: data.hang,
            thong_so: data.thong_so
        }
    }

    docClient.put(params, (error)=>{
        if(!error){
            callback(true)
        }else{
            callback(false)
        }
    })
}

module.exports = {
    GetAllData,
    CreateItem
}