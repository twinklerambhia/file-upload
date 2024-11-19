import express,{Request, Response} from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
import mysql from 'mysql2/promise';
import path from 'path';
import Order from './Order';
import { log } from 'console';
const app= express();
const upload= multer({dest:"uploads/"})

const dbConfig= {
    host:'localhost',
    database:'uploadDB',
    user:'root',
    password:""
}
// Serve HTML file on the root route
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'form.html')); // Path to your HTML file
  });

app.post('/upload-excel',upload.single('file'), async (req:Request, res:Response) :Promise<void>=> {
    try{
        const file = req.file;
        if(!file){
            res.status(400).send('no file uploaded');
            return ;
        }
        const filePath= path.resolve(file.path);
        const workbook= xlsx.readFile(filePath);
        const worksheet= workbook.SheetNames[0];
        const sheetData= xlsx.utils.sheet_to_json(workbook.Sheets[worksheet]);
        
        const connection= await mysql.createConnection(dbConfig);
        
        for (const row of sheetData){
            const {customerName, source,destination,consignee,loadType,	consigneePhone,	remarkForConsignee,	billToAddress, 	scheduledDelivery,	specialRemark,insuranceNumber}
            = row as {
                customerName: string;
                source: string;
                destination: string;
                consignee: string;
                loadType:string;
                consigneePhone:number; 
                remarkForConsignee:string;
                billToAddress:string; 
                scheduledDelivery:string;	
                specialRemark:string;
                insuranceNumber: string;
            };
            const scheduledDeliveryDate = new Date(scheduledDelivery);
            console.log(scheduledDeliveryDate)
          const data=  await Order.create({
                customerName,
                source,
                destination,
                consignee,
                loadType,
                consigneePhone,
                remarkForConsignee,
                billToAddress,
                scheduledDelivery:scheduledDeliveryDate,
                specialRemark,
                insuranceNumber,
              });
              console.log("oioioi",data)
        
        }
        await connection.end();

        res.status(200).send('db updated successfully');

    }


    catch(error){
        console.log('error processing file: ',error)
        res.status(500).send('error processing file');
        return;
    }
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
