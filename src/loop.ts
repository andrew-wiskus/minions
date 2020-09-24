export const loop = (x) => (f) => {
    if (x > 0) {
        f()
        loop(x - 1)(f)
    }
}

// // use it
// loop(3)(() => console.log('hi'))

// // or define intermediate functions for reuse
// let twice = loop(2)

// // twice the power !
// twice(() => console.log('double vision'))
