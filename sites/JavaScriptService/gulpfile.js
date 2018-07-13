var gulp = require("gulp"),
    merge = require("merge2"),
    ts = require("gulp-typescript");
   bundle = require("gulp-bundle-assets");

var tsProject = ts.createProject({
    //-----------------------------------------
    declaration: true,
    noImplicitAny: true,
    noExternalResolve: false,
    //-----------------------------------------
    out: "application.js"
    //---------------------------------------
});

//gulp.task("scripts", function () {
//    var tsResult = gulp.src(["src/**/*.ts", "src/**/*.tsx"])
//        .pipe(tsProject);
//    return merge([
//        tsResult.js.pipe(gulp.dest("wwwroot/dist"))
//    ]);
//});

gulp.task('scripts', function () {
    var tsResult = gulp.src('src/**/*.ts')
        .pipe(ts({
            declaration: true
        }));  

    return merge([
        tsResult.dts.pipe(gulp.dest("wwwroot/dist")),
        tsResult.js.pipe(gulp.dest('wwwroot/js'))
    ]);
});
gulp.task("bundle", function () {
    return gulp.src("./bundle.config.js")
        .pipe(bundle())
        .pipe(gulp.dest("dist"))
         .pipe(gulp("wwwroot/dist"));
});
gulp.task("watch", ["scripts"], function () {
    gulp.watch("src/**/*.ts", ["scripts"]);
    gulp.bundle();
});