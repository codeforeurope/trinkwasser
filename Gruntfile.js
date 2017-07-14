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
        files: {
          'build/js/transparentwater.min.js': ['src/js/**/*.js']
        }
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'build/css/transparentwater.min.css': ['src/css/**/*.css', 'font-awesome.min.css']
        }
      }
    },
    jshint: {
      files: ['gruntfile.js', 'src/js/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          window: true,
          dw: true,
          L: true
        },
        laxbreak: true
      }
    },
    rev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },
      assets: {
        files: [{
          src: ['build/{css,js}/*.{js,css}']
        }]
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
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
          src: ['build/{css,js,img}']
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
          template: 'lang/templates/LC_MESSAGES/messages.pot', // (default: 'locale/templates/LC_MESSAGES/messages.pot')
          languages: ['en', 'fr', 'es', 'nl', 'de'],
          localeDir: 'lang/locale'
        }
      }
    },
    abideMerge: {
      default: { // Target name.
        options: {
          template: 'lang/templates/LC_MESSAGES/messages.pot',
          localeDir: 'lang/locale'
        }
      }
    },
    abideExtract: {
      js: {
        src: 'src/js/**/*.js',
        dest: 'lang/templates/LC_MESSAGES/messages.pot',
        options: {
          language: 'JavaScript'
        }
      },
      templates: {
        src: 'src/templates/**/*.html',
        dest: 'lang/templates/LC_MESSAGES/messages.pot',
        options: {
          keyword: '_',
          language: 'swig'
        }
      },
      html: {
        src: 'src/index.html',
        dest: 'lang/templates/LC_MESSAGES/messages.pot',
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-i18n-abide');
  grunt.loadNpmTasks('hernanex3-grunt-static-i18n');
  grunt.registerTask('build', ['clean:dist', 'i18n', 'cssmin', 'imagemin', 'uglify', 'copy:dist', 'copy:redirect']);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('i18n', ['abideCreate', 'abideExtract', 'statici18n']);
};
