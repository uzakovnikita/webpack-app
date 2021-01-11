import Post from '@models/post';
import * as $ from 'jquery';
import './styles/styles.css';
import logo from './assets/logo.jpg';
import json from './assets/data';
import xml from './assets/data.xml';
import './styles/less.less';
import './styles/sass.sass';
import './babel';
const post = new Post('webpack post title', logo);
console.log(`json: ${JSON.stringify(json)}`);
console.log('XML', xml);
$('pre').addClass('code').html(post.toString())