const http = require('http')
const fs = require('fs')
const fsPromises = fs.promises

const PORT = 3000
const path = require('path')
const server = http.createServer()

server.on('request', async(req, res)=>{

let filePath = path.join(__dirname, 'views', req.url ==='/'?'index.html': req.url)

let extname = path.extname(filePath)
let contentType='text/html; charset=utf-8'

switch (extname){
    case '.js':
    contentType = 'text/javascript';
    break;
    case '.png':
    contentType = 'image/png'
    break;
    case '.jpg':
    contentType = 'image/jpg'
    break;
    case '.html':
    contentType = 'text/html'
    break;
    case '.css':
    contentType = 'text/css'
    break;
    case '.jepg':
    contentType = 'image/jepg'
    break;
    case '.gif':
    contentType = 'image/gif'
    break;
  

}

let content

try{
    res.writeHead(200, { 'Content-Type':contentType})
    
    if(req.url === '/' && req.method === 'GET'){
        content = await fs.readFileSync(path.join(__dirname, 'views', 'index.html'))
        res.end(content)
    }else if(req.url.includes('css') && req.method === 'GET'){
        content = await fs.readFileSync(
            path.join(__dirname, 'views', 'index.css')
        )
        res.end(content)
    }
    else if(
        extname.includes('jpg') ||
        extname.includes('png') ||
        (extname.includes('gif') && req.method === 'GET')){
        content = await fs.readFileSync(filePath)
        
        res.end(content)
    }
    else if(extname.includes('js') && req.method === 'GET'){
        content = await fs.readFileSync(filePath)
        res.end(content)
    }
    else if(req.url === '/subdir' && req.method == 'GET'){
        content = fs.readFileSync(path.join(__dirname, 'subdir', 'subdir.html'))
        res.end(content)
    }
    else if(req.url === '/yang' && req.method == 'GET'){
        const user = [{
            firstname:'yang',
            phone:'6808',
        },
    ]
    content = JSON.stringify(yang)
    res.end(content)
    }
    else if(req.url === '/users' && req.method === 'GET'){
        content = fs.readFileSync(path.join(__dirname, 'datas', 'users.json'), 'utf-8')
        res.end(content)
    }
    
    if(req.url.includes('name') && req.method === 'GET'){
        const response = fs.readFileSync(path.join(__dirname, 'datas', 'users.json'), 'utf-8')
        const arys = JSON.parse(response)
        console.log(req.url)
        const search = req.url.split('/')
         const findName = arys.find((ary)=> ary.name === search[2])
         content = JSON.stringify(findName)
         res.end(content)
    }

    if(req.url.includes('name') && req.method === 'DELETE'){
        const response = fs.readFileSync(path.join(__dirname, 'datas', 'users.json'), 'utf-8')
        const arys = JSON.parse(response)
        const search = req.url.split('/')
         const findName = arys.find((ary)=> ary.name === search[2])
         const deletedUsers= arys.filter((ary)=>ary.name != search[2])

         fs.writeFileSync(path.join(__dirname, 'datas', 'user.json'), Json.stringify(deletedUsers, null, ''), 'utf-8', (err) =>{if (err) throw err})

         res.end(JSON.stringify(deletedUsers))
    }

    else if(req.url === 'user' && req.method === 'POST'){
        let body = ''
        let newUser=''

        req.on('data', (chunk)=>{
            body=+chunk.toSTring();
            console.log(chunk)
        })
    }
    else if(req.url === '/user' && req.method === 'PUT'){
        let body=''
        let newUser=''
        req.on('data', (chunk)=>{
            body=+chunk.toSTring()

            const response = fs.readFileSync(path.join(__dirname, 'datas', 'users.jsons'), 'utf-8')
            const arys = Json.parse(response)
            const filteredArys = arys.filter((ary)=>ary.name != name)

            filteredArys.push(newUser)
            
            fs.writeFileSync(path.join(__dirname, 'datas', 'user.json'), Json.stringify(newUsers, null, ''), 'utf-8', (err) =>{if (err) throw err})

         res.end(JSON.stringify(newUsers))
        })
    }
    console.log(req.method, filePath)
    
}catch(err) {
    console.log(err)
}
})

server.listen(PORT, ()=>{
    console.log('server start', PORT)
})