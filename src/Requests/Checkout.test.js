const rewire = require("rewire")
const Checkout = rewire("./Checkout")
const fromEuroToCent = Checkout.__get__("fromEuroToCent")
const successPayment = Checkout.__get__("successPayment")
const errorPayment = Checkout.__get__("errorPayment")
const onToken = Checkout.__get__("onToken")
// @ponicode
describe("fromEuroToCent", () => {
    test("0", () => {
        let callFunction = () => {
            fromEuroToCent(800.39)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fromEuroToCent(-10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fromEuroToCent(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fromEuroToCent(1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fromEuroToCent(170.04)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fromEuroToCent(-Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("successPayment", () => {
    test("0", () => {
        let callFunction = () => {
            successPayment("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            successPayment(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("errorPayment", () => {
    test("0", () => {
        let callFunction = () => {
            errorPayment("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            errorPayment(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onToken", () => {
    test("0", () => {
        let callFunction = () => {
            onToken(800.39, "policy_abc", 56784)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            onToken(800.39, "Organize files in your directory instantly, ", 12345)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            onToken(358.46, "my metering label", 12345)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            onToken(467.94, "my metering label", 12345)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            onToken(467.94, "Organize files in your directory instantly, ", "bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            onToken("", "", -Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
