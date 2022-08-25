<?php
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
