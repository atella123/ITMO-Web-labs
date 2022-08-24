<?php
$startTime = microtime(true);
$x = $_GET["x"];
$y = $_GET["y"];
$r = $_GET["r"];

if (filter_var($x, FILTER_VALIDATE_FLOAT) === false) {
    header(":", true, 400);
    echo create_invalid_response($startTime);
    exit();
}

const X_VALUES = array(-3, -2, -1, 0, 1, 2, 3, 4, 5);
if (!in_array($x, X_VALUES)) {
    header(":", true, 400);
    echo create_invalid_response($startTime);
    exit();
}

if (filter_var($y, FILTER_VALIDATE_FLOAT) === false) {
    header(":", true, 400);
    echo create_invalid_response($startTime);
    exit();
}

if ($y < -3 || $y > 5) {
    header(":", true, 400);
    echo create_invalid_response($startTime);
    exit();
}

if (filter_var($r, FILTER_VALIDATE_FLOAT) === false) {
    header(":", true, 400);
    echo create_invalid_response($startTime);
    exit();
}

const R_VALUES = array(1, 1.5, 2, 2.5, 3);
if (!in_array($r, R_VALUES)) {
    header(":", true, 400);
    echo create_invalid_response($startTime);
    exit();
}

echo json_encode(array("result" => in_area($x, $y, $r), "currentTime" => microtime(true), "completionTime" => microtime(true) - $startTime, "valid" => true));

function in_rect($x, $y, $r)
{
    return $x >= 0 && $x < $r && $y >= 0 && $y < $r;
}

function in_sector($x, $y, $r)
{
    return $x >= 0 && $y <= 0 && pow($x, 2) + pow($y, 2) <= pow($r, 2) / 4;
}

function in_triangle($x, $y, $r)
{
    return $x <= 0 && $y <= 0 && $x >= -$y - $r;
}

function in_area($x, $y, $r)
{
    return in_rect($x, $y, $r) || in_sector($x, $y, $r) || in_triangle($x, $y, $r);
}

function create_invalid_response($startTime)
{
    return json_encode(array("currentTime" => microtime(true), "completionTime" => microtime(true) - $startTime, "valid" => false));
}
