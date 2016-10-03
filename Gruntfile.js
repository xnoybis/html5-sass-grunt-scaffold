/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*\n <%= pkg.title || pkg.name %> - <%= grunt.template.today("yyyy-mm-dd") %>\n Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> (<%= pkg.author.email ? pkg.author.email : "" %>)\n*/\n\n',
    // Task configuration.
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded',
          loadPath: ['dev/scss']
        },
        files: {
          'public_html/css/styles.css': 'dev/scss/main.scss'
        }
      },
      foundation: {                            // Target
        options: {                       // Target options
          style: 'expanded',
          loadPath: ['dev/scss/foundation', 'dev/scss/foundation/settings']
        },
        files: {
          'public_html/css/foundation.css': 'dev/scss/foundation.scss'
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['dev/js/**/*.js'],
        dest: 'public_html/js/app.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        sourceMap: true
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'public_html/js/app.min.js'
      }
    },
    watch: {
      scripts: {
        files: ['dev/js/**/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false
        }
      },
      sass: {
        files: ['dev/scss/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      },
      livereload: {
        files: ['public_html/**/*.html', 'public_html/**/*.php', 'dev/js/**/*.js', 'dev/scss/**/*.scss'],
        options: {
          livereload: true,
          spawn: false
        },
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task.
  grunt.registerTask('default', ['sass', 'concat', 'uglify', 'watch']);

};
