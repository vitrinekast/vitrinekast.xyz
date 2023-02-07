// const { src, dest, series, parallel, watch } = require("gulp");

// const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
// const plumber = require("gulp-plumber");
// const rename = require("gulp-rename");
// const concat = require("gulp-concat");
// const sass = require("gulp-sass");
// const uglify = require("gulp-uglify");
// const mode = require("gulp-mode")({
//   modes: ["production", "development"],
//   default: "development",
//   verbose: false,
// });
// const wpPot = require("gulp-wp-pot");
// const gulpif = require("gulp-if");
const bump = require("gulp-bump");
// const sourcemaps = require("gulp-sourcemaps");
// const autoprefixer = require("gulp-autoprefixer");
const argv = require("yargs").argv;
const fs = require("fs");
const semver = require("semver");
// const zip = require("gulp-zip");
// const config = require("./config.json");
// const { NULL } = require("node-sass");
// const connect = require("gulp-connect-php");

const plumber = require("gulp-plumber");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const mode = require("gulp-mode")({
  modes: ["production", "development"],
  default: "development",
  verbose: false,
});

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const config = require("./config.json");
var browsersync = require("browser-sync").create();
const connect = require("gulp-connect-php");

// Some helper functions
var getPackageJson = function () {
  return JSON.parse(fs.readFileSync("./package.json", "utf8"));
};
var getType = function () {
  if (argv.major) return "major";
  if (argv.minor) return "minor";
  return "patch";
};

// TASKS

// BrowserSync
//Start Server
function browserSync() {
  return connect.server(
    {
      router: "./kirby/router.php",
      port: 8000,
      keepalive: true,
      debug: true,
    },
    function () {
      browsersync.init({
        proxy: "127.0.0.1:8000",
        notify: false,
        ghostMode: false,
      });
    }
  );
}

//Reload Browser
function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// release theme
function releaseTheme() {
  return gulp
    .src(config.templates.dest + "/**/*")
    .pipe(gulp.dest(config.templates.release));
}

// Generate pot files
function language() {
  if (!config.multilang) return gulp.src(".");
  return gulp
    .src(config.localize.src, { allowEmpty: true })
    .pipe(
      wpPot({
        domain: config.theme_name,
        package: config.theme_name + " theme",
      })
    )

    .pipe(gulp.dest(`${config.localize.dest}/${config.theme_name}.pot`));
}

// Move assets
function assets() {
  return gulp
    .src(config.assets.src, { allowEmpty: true })
    .pipe(gulp.dest(config.assets.dest))
    .pipe(browsersync.stream());
}

// Copy scss files
function copyCss() {
  if (!config.copyCSS) return gulp.src(".");
  console.log("run copycss");
  return gulp
    .src(config.scss.src.concat(config.scss.files), { allowEmpty: true })
    .pipe(gulp.dest(config.assets.dest + "scss"))
    .pipe(browsersync.stream());
}

// CSS task
// TODO: autoprefixer,
function css() {
  return gulp
    .src(config.scss.src, { allowEmpty: false })
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(config.scss.dest));
}

function images() {
  return gulp
    .src(config.images.src, { allowEmpty: true })
    .pipe(newer(config.images.dest))

    .pipe(gulp.dest(config.images.dest))
    .pipe(browsersync.stream());
}

// Transpile, concatenate and minify dev scripts
// TODO: babel
function scriptsDev() {
  return gulp
    .src(config.js.src, { allowEmpty: true })
    .pipe(concat("app.js"))
    .pipe(plumber())
    .pipe(
      mode.production(
        uglify({
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        })
      )
    )
    .pipe(gulp.dest(config.js.dest))
    .pipe(browsersync.stream());
}

// Transpile, concatenate and minify lib scripts
function scriptsLibs() {
  return gulp
    .src(config.js.libs, { allowEmpty: true })
    .pipe(concat("libs.js"))
    .pipe(plumber())
    .pipe(mode.production(uglify()))
    .pipe(gulp.dest(config.js.dest))
    .pipe(browsersync.stream());
}

// Transpile, concatenate and minify lib scripts
function scriptsModules() {
  return gulp
    .src(config.js.modules, { allowEmpty: true })
    .pipe(gulp.dest(config.js.dest))
    .pipe(browsersync.stream());
}

// Move the templates
function templates() {
  return gulp
    .src(config.templates.src, { allowEmpty: true })
    .pipe(gulp.dest(config.templates.dest))
    .pipe(browsersync.stream());
}

// Bump the version
function bumpVersion() {
  var pkg = getPackageJson();
  var newVer = semver.inc(pkg.version, getType());

  return gulp
    .src(config.version.src, { base: "./", allowEmpty: true })
    .pipe(
      mode.production(
        bump({
          version: newVer,
        })
      )
    )
    .pipe(gulp.dest(config.version.dest));
}

// Watch files
function watchFiles() {
  gulp.watch(config.scss.files, gulp.series(css, copyCss, browsersyncReload));
  gulp.watch(config.scss.files, gulp.series(css, browsersyncReload));
  gulp.watch(config.js.src, gulp.series(scriptsDev, browsersyncReload));
  gulp.watch(config.assets.src, gulp.series(assets, browsersyncReload));
  gulp.watch(config.js.libs, gulp.series(scriptsLibs, browsersyncReload));
  gulp.watch(config.js.modules, gulp.series(scriptsModules, browsersyncReload));
  gulp.watch(config.images.src, gulp.series(images, browsersyncReload));
  gulp.watch(config.templates.src, gulp.series(templates, browsersyncReload));
}

const build = gulp.series(
  bumpVersion,
  assets,
  language,
  gulp.parallel(
    css,
    images,
    scriptsDev,
    scriptsLibs,
    scriptsModules,
    templates
  ),
  copyCss,
  releaseTheme
);

const serve = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// exports.bump = bump;
exports.default = build;
exports.serve = serve;
