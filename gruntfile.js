module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            jade: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            // js: {
            //     files: ['public/js/**', 'models/**/*.js', 'models/**/*.js','controllers/**/*.js','config/*.js'],
            //     tasks: ['jshint'],
            //     options: {
            //         livereload: true//当文件改动 将重新启动N
            //     }
            // },
            uglify: {
               files: ['public/**/*.js'],
               tasks: ['uglify'],
               options: {
                   livereload: true
               }
            },
            cssmin: {
                files: ['public/**/*.css'],
                tasks: ['cssmin'],
                options: {
                    livereload: true
                }
            },
            concat: {
                files: ['public/js/**/*.js','public/css/**/*.css'],
                tasks: ['concat'],
                options: {
                    livereload: true
                }
            },
            styles: {
                files: ['public/**/*.less'],
                // tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        },
//jshint 检查语法错误
//         jshint: {
//             options: {
//                 jshintrc: '.jshintrc',
//                 ignores: ['public/libs/**/*.js']
//             },
//             all: ['public/js/*.js', 'test/**/*.js', 'app/**/*.js']
//         },

        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    'public/build/index.css': 'public/less/index.less'
                }
            }
        },
//压缩js 并且压缩变量名 增加一条注释
        uglify: {
            development: {
                options: {
                    mangle: false
                },
                files: [{
                    expand: true,
                    cwd: 'public/js',
                    src: ['**/*.js','!*.min.js'],
                    dest: 'public/js',
                    ext:'.min.js'
                }]
            }
        },
        cssmin: {
            target: {
                options: {
                    banner: '/*!by rowthan */'
                },
                files: [{
                    expand: true,
                    cwd: 'public/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/css',
                    ext: '.min.css'
                }]
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            // dist: {
            //     src: ['public/js/main.min.js','public/js/photo-gallery.js'],
            //     dest: 'public/js/footer.js'
            // },
            csscon:{
                src: ['public/plugin/bootstrap/css/bootstrap.css', 'public/css/main.min.css', 'public/fonts/iconfont.css','public/css/responsive.min.css'],
                dest: 'public/css/header.css'
            }
        },
        imagemin: {                          // Task
            static: {                          // Target
                options: {                       // Target options
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }],
                    //use: [mozjpeg()]
                },
                files: {                         // Dictionary of files
                    'dist/img.png': 'publicsrc/img.png', // 'destination': 'source'
                    'dist/img.jpg': 'src/img.jpg',
                    'dist/img.gif': 'src/img.gif'
                }
            },
            //dynamic: {                         // Another target
            //    files: [{
            //        expand: true,                  // Enable dynamic expansion
            //        cwd: 'public/upload',                   // Src matches are relative to this path
            //        src: ['**/*.{png,jpg,jpeg,gif}'],   // Actual patterns to match
            //        dest: 'public/testimg'                  // Destination path prefix
            //    }]
            //}
        },
        uncss: {
            dist: {
                options: {
                    ignore: [/js-.+/, '.special-class'],
                    ignoreSheets: [/fonts.googleapis/],
                },
                files: {
                    'public/tidy.css': ['public/fortidy.html']
                }
            }
        },

        nodemon: {
            dev: {
                script:'app.js',
                options: {
                    file: 'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store','*.jade'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 1,//当忙碌时等待重启时间
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },

        //mochaTest: {
        //    options: {
        //        reporter: 'spec'  //
        //    },
        //    src: ['test/**/*.js'] //指定目录 test 下所有的js文件
        //},

        concurrent: {
            tasks: ['nodemon', 'watch','uncss'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch')//有文件修改增加删除 会启动该任务
    grunt.loadNpmTasks('grunt-nodemon')//实时监听app.js 入口文件改动会重新启动
    grunt.loadNpmTasks('grunt-concurrent')//针对慢任务 如sass coffeejs等编译为慢任务
    //grunt.loadNpmTasks('grunt-mocha-test')//
    //grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-uncss');
    //grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.option('force', true)//避免语法错误而导致整个服务停止

    grunt.registerTask('default', ['concurrent'])//注册任务

    //grunt.registerTask('test', ['mochaTest'])
}