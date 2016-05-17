// Generated on 2016-03-15 using generator-sliceart 3.1.0
// node modules
var path = require('path');
// sliceart modules
var paths = require('./sliceart_modules/paths.js');
var uglifyRename = require('./sliceart_modules/uglify-rename.js');
var renderBowerFile = require('./sliceart_modules/render-bower-file.js');
var fileExists = require('file-exists');
var hostExists = fileExists('./sliceart_modules/host.js');

if (hostExists) {
  var host = require('./sliceart_modules/host.js');
}

var pkg = require('./package.json');

var cssminFilesOpt = {};
cssminFilesOpt[paths.build.css.pathToFolder + pkg.name + '.min.css'] =
  renderBowerFile('css', 'build', true).concat([
      paths.dev.css.pathToFiles,
      '!' + paths.dev.css.pathToFolder + 'ie{,9}.css'
  ]);
cssminFilesOpt[paths.build.css.pathToFolder + 'ie.css'] = [paths.dev.css.pathToFolder + 'ie.css'];
cssminFilesOpt[paths.build.css.pathToFolder + 'ie9.css'] = [paths.dev.css.pathToFolder + 'ie9.css'];

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    compass: {
      dev: {
        options: {
          relativeAssets: true,
          outputStyle: 'expanded',
          noLineComments: true,
          sassDir: paths.dev.sass.pathToFolder,
          cssDir: paths.dev.css.pathToFolder,
          imagesDir: paths.dev.images.pathToFolder,
          fontsDir: paths.dev.fonts.pathToFolder
        }
      },
      markup: {
        options: {
          relativeAssets: true,
          outputStyle: 'expanded',
          noLineComments: true,
          sassDir: paths.dev.sass.pathToFolder,
          cssDir: paths.markup.css.pathToFolder,
          imagesDir: paths.markup.images.pathToFolder,
          fontsDir: paths.markup.fonts.pathToFolder
        }
      },
      build: {
        options: {
          relativeAssets: true,
          outputStyle: 'compressed',
          sassDir: paths.dev.sass.pathToFolder,
          cssDir: paths.build.css.pathToFolder,
          imagesDir: paths.build.images.pathToFolder,
          fontsDir: paths.build.fonts.pathToFolder
        }
      }
    },
    cssmin: {
      combine: {
        options: {
          banner: '/*! ' + pkg.name + ' - v' + pkg.version + ' - ' + '<%=grunt.template.today("yyyy-mm-dd")%> */',
          keepSpecialComments: 0
        },
        files: cssminFilesOpt
      }
    },
    connect: {
      options: {
        port: 9000,
        open: true
      }
    },
    imagemin: {
      markup: {
        files: [{
          expand: true,
          cwd: paths.dev.images.pathToFolder,
          src: paths.dev.images.files,
          dest: paths.markup.images.pathToFolder
        }]
      },
      build: {
        files: [{
          expand: true,
          cwd: paths.dev.images.pathToFolder,
          src: paths.dev.images.files,
          dest: paths.build.images.pathToFolder
        }]
      }
    },
    concat: {
      options: {
        separator: '\n\r;'
      },
      build: {
        src: renderBowerFile('js', 'build', true).concat([paths.dev.js.pathToFiles, '!' + paths.dev.js.pathToRequireFiles]),
        dest: paths.build.js.pathToFolder + pkg.name + '.min.js'
      }
    },
    uglify: {
      build: {
        files: [{
          expand: true,
          cwd: paths.build.folder,
          src: [paths.build.js.folder + pkg.name + '.min.js'],
          dest: paths.build.folder
        }]
      },
      markup: {
        files: renderBowerFile('js', 'markup', false, true)
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            paths.dev.css.pathToFolder,
            paths.dev.html.files
          ]
        },
        options: {
          watchTask: true,
          server: './',
          port: 9000,
          startPath: paths.dev.folder
        }
      }
    },
    bsReload: {
      css: {
        reload: paths.dev.css.pathToFolder
      },
      all: {
        reload: true
      }
    },
    jshint: {
      options:{
        jshintrc: '.jshintrc'
      },
      src: [paths.dev.js.pathToOurFiles, '!' + paths.dev.js.pathToRequireFiles]
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      dev: {
        src: [paths.dev.css.pathToFiles]
      },
      markup: {
        src: [paths.markup.css.pathToFiles]
      },
      build: {
        src: [paths.build.css.pathToFiles]
      }
    },
    clean: {
      markup: [paths.markup.folder],
      build: [paths.build.folder],
      css: [paths.dev.css.pathToFolder]
    },
    copy: {
      allB: {
        files: [{
          expand: true,
          cwd: paths.dev.folder,
          src: [
            '**',
            '!' + paths.dev.html.files,
            '!' + paths.dev.css.folder + '**',
            '!' + paths.dev.jade.folder + '**',
            '!' + paths.dev.images.folder + '**',
            '!' + paths.dev.js.folder + '**',
            '!' + paths.dev.sass.folder + '**',
            '!' + paths.dev.less.folder + '**'
          ],
          dest: paths.build.folder
        }].concat(renderBowerFile('images', 'build'), renderBowerFile('other', 'build'))
      },
      allImages: {
        files: [{
          expand: true,
          cwd: paths.dev.folder,
          src: [paths.dev.images.folder + '**'],
          dest: paths.markup.folder
        }]
      },
      allM: {
        files: [{
          expand: true,
          cwd: paths.dev.folder,
          src: [
            '**',
            '!' + paths.dev.html.files,
            '!' + path.join(paths.dev.js.folder, paths.dev.js.requireFiles),
            '!' + paths.dev.css.folder + '**',
            '!' + paths.dev.jade.folder + '**',
            '!' + paths.dev.images.folder + '**'
          ],
          dest: paths.markup.folder
        }].concat(renderBowerFile('css', 'markup'), renderBowerFile('images', 'markup'), renderBowerFile('other', 'markup'))
      }
    },
    processhtml: {
      options: {
        strip: true
      },
      markup: {
        options: {
          data: {
            ie: ''
          }
        },
        expand: true,
        cwd: paths.dev.folder,
        src: [paths.dev.html.files],
        dest: paths.markup.folder
      },
      build: {
        options: {
          data: {
            ie: ''
          }
        },
        expand: true,
        cwd: paths.dev.folder,
        src: [paths.dev.html.files],
        dest: paths.build.folder
      }
    },
    jade: {
      options: {
        pretty: true
      },
      dev: {
        expand: true,
        cwd: paths.dev.jade.pathToFolder,
        src: [paths.dev.jade.files, '!{**/,}_*/**'],
        dest: paths.dev.folder,
        ext: '.html'
      },
      markup: {
        expand: true,
        cwd: paths.dev.jade.pathToFolder,
        src: [paths.dev.jade.files, '!{**/,}_*/**'],
        dest: paths.markup.folder,
        ext: '.html'
      },
      build: {
        expand: true,
        cwd: paths.dev.jade.pathToFolder,
        src: [paths.dev.jade.files, '!{**/,}_*/**'],
        dest: paths.build.folder,
        ext: '.html'
      }
    },
    watch: {
      options: {
        spawn: false
      },
      jade: {
        files: [paths.dev.jade.pathToFiles],
        tasks: ['jade:dev', 'bsReload:all']
      },
      scripts: {
        files: [paths.dev.js.pathToOurFiles, '!' + paths.dev.js.pathToRequireFiles],
        tasks: ['jshint']
      },
      
      compass: {
        files: [paths.dev.sass.pathToFiles],
        tasks: ['clean:css', 'compass:dev', 'csslint:dev', 'bsReload:css']
      }
    }
  });

  if (hostExists) {
    grunt.config.set('ftp-deploy', {
      build: {
        auth: {
          host: host.name,
          port: 21,
          authKey: 'sliceart'
        },
        src: 'build',
        dest: host.path
      }
    });
  }

  grunt.registerTask('default', function () {
    grunt.task.run([
      'jshint',
      'clean:css',
      'compass:dev',
      'csslint:dev',
      'jade:dev',
      'connect',
      'browserSync',
      'watch'
    ]);
  });
  grunt.registerTask('markup', function () {
    grunt.task.run([
      'clean:markup',
      'jade:dev',
      'processhtml:markup',
      'jshint',
      'imagemin:markup',
      'compass:markup',
      'csslint:markup',
      'copy:allM',
      'uglify:markup'
    ]);
  });
  grunt.registerTask('build', function () {
    grunt.task.run([
      'clean:build',
      'jade:dev',
      'processhtml:build',
      'jshint',
      'imagemin:build',
      'concat:build',
      'uglify:build',
      'clean:css',
      'compass:dev',
      'csslint:dev',
      'cssmin',
      'copy:allB'
    ]);
  });

  if (hostExists) {
    grunt.registerTask('deploy', function () {
      grunt.task.run([
        'build',
        'ftp-deploy'
      ]);
    });
  }
};
