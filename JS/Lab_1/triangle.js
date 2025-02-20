function toDegrees(radians) {
    return radians * (180 / Math.PI);
}

const calculations = {
    "leg-leg": (v1, v2) => {
        let a = v1, b = v2, c = Math.sqrt(a ** 2 + b ** 2);
        let alpha = toDegrees(Math.atan(a / b));
        let beta = 90 - alpha;
        return { a, b, c, alpha, beta };
    },
    "leg-hypotenuse": (leg, hypotenuse) => {
        if (leg >= hypotenuse) return "The leg cannot be greater than or equal to the hypotenuse.";
        let a = leg, c = hypotenuse, b = Math.sqrt(c ** 2 - a ** 2);
        let alpha = toDegrees(Math.asin(a / c));
        let beta = 90 - alpha;
        return { a, b, c, alpha, beta };
    },
    "leg-angle": (leg, angle) => {
        if (angle <= 0 || angle >= 90) return "Invalid angle value.";
        let alpha = angle, beta = 90 - alpha;
        let c = leg / Math.sin(alpha * Math.PI / 180);
        let b = Math.sqrt(c ** 2 - leg ** 2);
        return { a: leg, b, c, alpha, beta };
    },
    "hypotenuse-angle": (hypotenuse, angle) => {
        if (angle <= 0 || angle >= 90) return "Invalid angle value.";
        let alpha = angle, beta = 90 - alpha;
        let a = hypotenuse * Math.sin(alpha * Math.PI / 180);
        let b = Math.sqrt(hypotenuse ** 2 - a ** 2);
        return { a, b, c: hypotenuse, alpha, beta };
    }
};

function triangle(value1, type1, value2, type2) {
    console.log("Usage: triangle(value1, type1, value2, type2)");
    console.log("Types: leg, hypotenuse, adjacent angle, opposite angle, angle");

    const validTypes = ["leg", "hypotenuse", "angle"];
    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Invalid type. Please refer to the usage instructions.");
        return "failed";
    }

    if (value1 <= 0 || value2 <= 0) {
        console.log("Values must be positive numbers.");
        return "failed";
    }

    const key = [type1, type2].sort().join("-");
    if (!calculations[key]) {
        console.log("Invalid combination of inputs. Please check the instructions.");
        return "failed";
    }

    const result = calculations[key](value1, value2);
    if (typeof result === "string") {
        console.log(result);
        return "failed";
    }

    const outputText = `a = ${result.a.toFixed(2)}, b = ${result.b.toFixed(2)}, c = ${result.c.toFixed(2)}\nalpha = ${result.alpha.toFixed(2)}°, beta = ${result.beta.toFixed(2)}°`;
    console.log(outputText);

    const output = document.getElementById("output");
    if (output) {
        output.textContent = outputText;
    }
    return "success";
}

function solveTriangle() {
    const value1 = parseFloat(document.getElementById("value1").value);
    const type1 = document.getElementById("type1").value;
    const value2 = parseFloat(document.getElementById("value2").value);
    const type2 = document.getElementById("type2").value;

    triangle(value1, type1, value2, type2);
}
