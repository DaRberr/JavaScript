function toDegrees(radians) {
    return radians * (180 / Math.PI);
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function solveFromLegs(a, b) {
    let c = Math.sqrt(a ** 2 + b ** 2);
    let alpha = toDegrees(Math.atan(a / b));
    let beta = 90 - alpha;
    return { a, b, c, alpha, beta };
}

function solveFromLegAndHypotenuse(a, c) {
    if (a >= c) return "The leg cannot be greater than or equal to the hypotenuse.";
    let b = Math.sqrt(c ** 2 - a ** 2);
    let alpha = toDegrees(Math.asin(a / c));
    let beta = 90 - alpha;
    return { a, b, c, alpha, beta };
}

function solveFromLegAndAngle(leg, angle, isAdjacent) {
    if (angle <= 0 || angle >= 90) return "Invalid angle value.";
    let rad = toRadians(angle);
    let a, b, c;
    
    if (isAdjacent) {
        a = leg;
        c = a / Math.cos(rad);
        b = Math.sqrt(c ** 2 - a ** 2);
    } else {
        b = leg;
        c = b / Math.sin(rad);
        a = Math.sqrt(c ** 2 - b ** 2);
    }

    let alpha = isAdjacent ? angle : 90 - angle;
    let beta = 90 - alpha;
    return { a, b, c, alpha, beta };
}

function solveFromHypotenuseAndAngle(c, angle) {
    if (angle <= 0 || angle >= 90) return "Invalid angle value.";
    let rad = toRadians(angle);
    let a = c * Math.sin(rad);
    let b = c * Math.cos(rad);
    let alpha = angle;
    let beta = 90 - alpha;
    return { a, b, c, alpha, beta };
}

function triangle(value1, type1, value2, type2) {
    console.log("Usage: triangle(value1, type1, value2, type2)");
    console.log("Types: leg, hypotenuse, adjacent angle, opposite angle, angle");

    const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Invalid type. Please refer to the usage instructions.");
        return "failed";
    }

    if (value1 <= 0 || value2 <= 0) {
        console.log("Values must be positive numbers.");
        return "failed";
    }

    let result;
    if (type1 === "leg" && type2 === "leg") {
        result = solveFromLegs(value1, value2);
    } else if (type1 === "leg" && type2 === "hypotenuse") {
        result = solveFromLegAndHypotenuse(value1, value2);
    } else if (type1 === "hypotenuse" && type2 === "leg") {
        result = solveFromLegAndHypotenuse(value2, value1);
    } else if (type1 === "leg" && type2 === "adjacent angle") {
        result = solveFromLegAndAngle(value1, value2, true);
    } else if (type1 === "adjacent angle" && type2 === "leg") {
        result = solveFromLegAndAngle(value2, value1, true);
    } else if (type1 === "leg" && type2 === "opposite angle") {
        result = solveFromLegAndAngle(value1, value2, false);
    } else if (type1 === "opposite angle" && type2 === "leg") {
        result = solveFromLegAndAngle(value2, value1, false);
    } else if (type1 === "hypotenuse" && type2 === "angle") {
        result = solveFromHypotenuseAndAngle(value1, value2);
    } else if (type1 === "angle" && type2 === "hypotenuse") {
        result = solveFromHypotenuseAndAngle(value2, value1);
    } else {
        console.log("Invalid combination of inputs. Please check the instructions.");
        return "failed";
    }

    if (typeof result === "string") {
        console.log(result);
        return "failed";
    }

    console.log(`a = ${result.a.toFixed(2)}, b = ${result.b.toFixed(2)}, c = ${result.c.toFixed(2)}`);
    console.log(`alpha = ${result.alpha.toFixed(2)}°, beta = ${result.beta.toFixed(2)}°`);
    return "success";
}
