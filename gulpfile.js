const { src, dest, series, parallel, watch } = require("gulp");
const browsersync = require("browser-sync").create();
const del = require("del");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const mode = require("gulp-mode")({
  modes: ["production", "development"],
  default: "development",
  verbose: false,
});
const wpPot = require("gulp-wp-pot");
const gulpif = require("gulp-if");
const bump = require("gulp-bump");
const sourcemaps = require("gulp-sourcemaps");
const uglifycss = require("gulp-uglifycss");
const autoprefixer = require("gulp-autoprefixer");
const argv = require("yargs").argv;
const fs = require("fs");
const semver = require("semver");
const zip = require("gulp-zip");
const config = require("./config.json");
const { NULL } = require("node-sass");

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
function browserSync(done) {
  browsersync.init({
    proxy: config.proxy,
  });
  done();
}

// Clean assets
function clean() {
  return del([config.templates.release]);
}

// release theme
function releaseTheme() {
  return src(config.templates.dest + "/**/*").pipe(
    dest(config.templates.release)
  );
}

// Generate pot files
function language() {
  if (!config.multilang) return src(".");
  return src(config.localize.src, { allowEmpty: true })
    .pipe(
      wpPot({
        domain: config.theme_name,
        package: config.theme_name + " theme",
      })
    )

    .pipe(dest(`${config.localize.dest}/${config.theme_name}.pot`));
}

// Create the ZIP file
function releaseZip() {
  var package = getPackageJson();

  return src(config.templates.dest + "/**/**/*")
    .pipe(
      mode.production(
        dest("../dimitrikruithofwebsiteempty/dimitrikruithof-website")
      )
    )
    .pipe(mode.production(zip(`${config.theme_name}_${package.version}.zip`)))
    .pipe(mode.production(dest("./")));
}

// Move assets
function assets() {
  return src(config.assets.src, { allowEmpty: true })
    .pipe(dest(config.assets.dest))
    .pipe(browsersync.stream());
}

// Copy scss files
function copyCss() {
  if (!config.copyCSS) return src(".");
  return src(config.scss.src.concat(config.scss.files), { allowEmpty: true })
    .pipe(dest(config.assets.dest + "scss"))
    .pipe(browsersync.stream());
}

// CSS task
// TODO: autoprefixer,
function css() {
  return src(config.scss.src, { allowEmpty: true })
    .pipe(mode.development(sourcemaps.init()))
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["> 1%"],
      })
    )
    .pipe(mode.development(sourcemaps.write()))
    .pipe(dest(config.scss.dest))
    .pipe(mode.production(uglifycss()))
    .pipe(mode.production(rename({ suffix: ".min" })))
    .pipe(mode.production(dest(config.scss.dest)))
    .pipe(browsersync.stream());
}

function images() {
  return src(config.images.src, { allowEmpty: true })
    .pipe(newer(config.images.dest))

    .pipe(dest(config.images.dest))
    .pipe(browsersync.stream());
}

// Transpile, concatenate and minify dev scripts
// TODO: babel
function scriptsDev() {
  return src(config.js.src, { allowEmpty: true })
    .pipe(concat("app.js"))
    .pipe(plumber())
    .pipe(mode.production(uglify()))
    .pipe(dest(config.js.dest))
    .pipe(browsersync.stream());
}

// Transpile, concatenate and minify lib scripts
function scriptsLibs() {
  return src(config.js.libs, { allowEmpty: true })
    .pipe(concat("libs.js"))
    .pipe(plumber())
    .pipe(mode.production(uglify()))
    .pipe(dest(config.js.dest))
    .pipe(browsersync.stream());
}

// Transpile, concatenate and minify lib scripts
function scriptsModules() {
  return src(config.js.modules, { allowEmpty: true })
    .pipe(dest(config.js.dest))
    .pipe(browsersync.stream());
}

// Move the templates
function templates() {
  return src(config.templates.src, { allowEmpty: true })
    .pipe(dest(config.templates.dest))
    .pipe(browsersync.stream());
}

// Bump the version
function bumpVersion() {
  var constant = `_${config.theme_name}_VERSION`;
  var pkg = getPackageJson();
  var newVer = semver.inc(pkg.version, getType());

  return src(config.version.src, { base: "./", allowEmpty: true })
    .pipe(
      mode.production(
        gulpif(
          (file) => {
            if (file.extname == ".php") return true;
          },
          bump({
            version: newVer,
            key: constant,
            regex: new RegExp(
              "([<|'|\"]?(" +
                constant +
                ")[>|'|\"]?[ ]*[:=,]?[ ]*['|\"]?[a-z]?)(\\d+.\\d+.\\d+)(-[0-9A-Za-z.-]+)?(\\+[0-9A-Za-z\\.-]+)?(['|\"|<]?)",
              "i"
            ),
          }),
          bump({
            version: newVer,
          })
        )
      )
    )
    .pipe(dest(config.version.dest));
}

// Watch files
function watchFiles() {
  watch(config.scss.files, series(css, copyCss));
  watch(config.scss.files, css);
  watch(config.js.src, scriptsDev);
  watch(config.assets.src, assets);
  watch(config.js.libs, scriptsLibs);
  watch(config.js.modules, scriptsModules);
  watch(config.images.src, images);
  watch(config.templates.src, templates);
}

const build = series(
  clean,
  bumpVersion,
  assets,
  language,
  parallel(css, images, scriptsDev, scriptsLibs, scriptsModules, templates),
  copyCss,
  releaseTheme,
  releaseZip
);

const serve = series(build, parallel(watchFiles, browserSync));

// exports.bump = bump;
exports.default = build;
exports.serve = serve;
