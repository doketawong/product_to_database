var csv = require('fast-csv');

const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'some2some',
  password: 'postgres',
  port: 5432,
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

csv.parseFile("final_data.csv", {headers: true})
.on('data', row => {
  processContent(row);

}
)

function processContent(row){
    const id = row.No;
    const content = row.Content;
    const title = row.Title;
    const price = row.Price;
    client.query(
        `INSERT INTO "product_list" ("id", "content", "title", "price")  
         VALUES ($1, $2, $3, $4)`, [id, content, title,price]); 
}