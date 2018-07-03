module.exports = function(grunt) {
  "use strict";
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    uglify: {
      options: {
        mangle: false,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      target:{
        options: {
          beautify: true
        },
        files: [
          {
            'build/js/transparentwater.min.js': ['src/js/**/*.js']
          },
          {
            'build/app.build.js': [
              'src/app/config.js',
              'src/app/modules/*.js',
              'src/app/models/*.js',
              'src/app/components/*.js',
              'src/app/index.js'
            ]
          }
        ]
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: [
          {
            'build/css/print.min.css': ['src/css/print.css','src/css/leaflet.css']
          },
          {
            'build/css/transparentwater.min.css': ['src/css/**/*.css', '!src/css/print.css']
          }
        ]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'src/',
          dest: 'build/',
          src: ['*.{ico,txt}', 'css/images/{,*/}*.{jpg,png,svg,gif}','img/{,*/}*.{jpg,png,svg,gif}', 'fonts/*', 'lib/*']
        }]
      },
      redirect: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'src/',
          dest: 'build/',
          src: ['redirect.html'],
          rename: function(dest, src) {
            return dest + 'index.html';
          }
        }]
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: ['build/{css,js,img}', 'build/templates/']
        }]
      },
      build: {
        files: [{
          dot: true,
          src: ['build/templates/']
        },{
          dot: true,
          src: ['build/app.build.js']
        },{
          dot: true,
          src: ['build/index-new.html']
        }]
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/img',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'build/img'
        }]
      }
    },
    abideCreate: {
      default: { // Target name.
        options: {
          template: 'lang/messages.pot', // (default: 'locale/templates/LC_MESSAGES/messages.pot')
          languages: ['en', 'fr', 'es', 'nl', 'de', 'ga', 'uk', 'pl', 'ro', 'uk'],
          localeDir: 'lang/locale'
        }
      }
    },
    abideMerge: {
      default: { // Target name.
        options: {
          template: 'lang/messages.pot',
          localeDir: 'lang/locale'
        }
      }
    },
    abideExtract: {
      js: {
        src: 'src/js/**/*.js',
        dest: 'lang/messages.pot',
        options: {
          language: 'JavaScript'
        }
      },
      templates: {
        src: 'src/templates/**/*.html',
        dest: 'lang/messages.pot',
        options: {
          keyword: '_',
          language: 'swig'
        }
      },
      html: {
        src: 'src/index.html',
        dest: 'lang/messages.pot',
        options: {
          keyword: '_',
          language: 'swig'
        }
      },
      htmlnew: {
        src: 'src/index-new.html',
        dest: 'lang/messages.pot',
        options: {
          keyword: '_',
          language: 'swig'
        }
      }
    },
    statici18n: {
      options: {
        localeDir: 'lang/locale'
      },
      build: {
        files: [{
          expand: true,
          cwd: 'build',
          src: 'app.build.js',
          dest: 'build'
        },
        {
          expand: true,
          cwd: 'src',
          src: 'index-new.html',
          dest: 'build'
        },
        {
          expand: true,
          cwd: 'src',
          src: 'index.html',
          dest: 'build'
        },{
          expand: true,
          cwd: 'src',
          src: 'templates/**/*.html',
          dest: 'build'
        }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-i18n-abide');
  grunt.loadNpmTasks('hernanex3-grunt-static-i18n');
  grunt.registerTask('build', ['clean:dist', 'uglify', 'i18n', 'cssmin', 'imagemin', 'copy:dist', 'copy:redirect', 'clean:build']);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('i18n', ['statici18n']);
};
