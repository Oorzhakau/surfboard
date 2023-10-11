const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require("gulp-rm");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const px2rem = require("gulp-smile-px2rem");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const svgo = require("gulp-svgo");
const svgSprite = require("gulp-svg-sprite");
var gulpif = require('gulp-if');

const env = process.env.NODE_ENV;
const {DIST_PATH, SRC_PATH} = require('./gulp.config');
sass.compiler = require("node-sass");

task("clean", () => {
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

task("copy:html", () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task("copy:img", () => {
  return src(`${SRC_PATH}/img/**/*.{jpg,png,svg}`)
    .pipe(dest(`${DIST_PATH}/img`));
});

task("styles", () => {
  return src([
    `${SRC_PATH}/css/main.scss`,
  ])
    .pipe(gulpif(env==="dev", sourcemaps.init()))
    .pipe(concat("main.min.scss"))
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    .pipe(gulpif(env==="dev",
      autoprefixer({
        cascade: false,
      })
    ))
    .pipe(gulpif(env==="prod", cleanCSS()))
    .pipe(gulpif(env==="dev", sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}/css`))
    .pipe(reload({ stream: true }));
});

task("server", function () {
  browserSync.init({
    server: {
      baseDir: `./${DIST_PATH}`,
    },
    open: false,
  });
});

task("scripts", () => {
  return src([
    `${SRC_PATH}/scripts/*.js`
  ])
    .pipe(gulpif(env==="dev", sourcemaps.init()))
    .pipe(concat("main.min.js", { newLine: ";" }))
    .pipe(gulpif(env==="prod",
      babel({
        presets: ["@babel/env"],
      })
    ))
    .pipe(gulpif(env==="prod", uglify()))
    .pipe(sourcemaps.write())
    .pipe(dest(`${DIST_PATH}/scripts`))
    .pipe(reload({ stream: true }));
});

task("watch", () => {
  watch(`./${SRC_PATH}/styles/**/*.scss`, series("styles"));
  watch(`./${SRC_PATH}/*.html`, series("copy:html"));
  watch(`./${SRC_PATH}/scripts/*.js`, series("scripts"));
  watch(`./${SRC_PATH}/img/**/*.{jpg,png,svg}`, series("copy:img"));
});

task(
  "default",
   series(
    "clean",
    parallel("copy:html", "copy:img", "styles", "scripts"),
    parallel("watch", "server")
  )
);

  
task(
  "build",
   series("clean", parallel("copy:html", "copy:img", "styles", "scripts"))
);
