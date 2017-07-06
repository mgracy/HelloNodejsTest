var express = require('express');

var app = express();

//加载数据库模块
var mongoose = require('mongoose');
//加载body-parser, 用来处理Post提交过来的请求
var  bodyParser = require('body-parser');

//加载模板处理模块
var swig = require('swig');
//1.定义应用使用模板引擎,
//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views', './views');
//注册所使用的模板引擎，第一个参数必须是 view engine,第二个参数各app.engine方法中的第一个参数要一致
app.set('view engine', 'html');
swig.setDefaults({cache: false});

//body-parser设置
app.use(bodyParser.urlencoded({extended: true}));


//设置静态文件托管
//当用户访问的url以/public开始, 那么直接返回对应__dirname + '/public'下的文件
app.use('/public', express.static(__dirname + '/public'));
//2.
// /*
// 配置路由
// */
app.get('/', function(req, res, next){
	// res.send('<h1>ssssssssssssssssss</h1>');

	
		// 读取views目录下的指定文件，解析并返回给客户端	
		// 第一个参数：表示模板的文件，相对于views目录
		// 第二个参数：传递给模板使用的数据	
	
	res.render('index');
});

app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/main', require('./routers/main'));

//连接数据库 (前提要先安装mongoosedb)
mongoose.connect('mongodb://localhost/test',function(err){
	if(err){
		console.log('Connect db failed');
	}else{
		console.log('Connect db successfully');
		app.listen(8081);

	}
});
