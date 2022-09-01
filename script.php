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
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Response</title>
</head>

<body>
    <table aria-describedby="result">
        <thead>
            <tr>
                <th>x</th>
                <th>y</th>
                <th>R</th>
                <th>Is inside?</th>
                <th>Completion time</th>
                <th>Current time</th>
            </tr>
        </thead>
        </tbody>
        <tr>
            <?php
            $startTime = microtime(true);
            $x = substr($_GET["x"], 0, 10);
            $y = substr($_GET["y"], 0, 10);
            $r = substr($_GET["r"], 0, 10);
            
            if (!is_numeric($x)) {
                header(":", true, 400);
                exit();
            }

            const X_VALUES = array(-3, -2, -1, 0, 1, 2, 3, 4, 5);
            if (!in_array($x, X_VALUES)) {
                header(":", true, 400);
                exit();
            }

            if (!is_numeric($y)) {
                header(":", true, 400);
                exit();
            }

            if ($y <= -3 || $y >= 5) {
                header(":", true, 400);
                exit();
            }

            if (!is_numeric($r)) {
                header(":", true, 400);
                exit();
            }

            const R_VALUES = array(1, 1.5, 2, 2.5, 3);
            if (!in_array($r, R_VALUES)) {
                header(":", true, 400);
                exit();
            }

            $result = in_area($x, $y, $r);
            $result_string = $result ? "Yes!" : "No";
            $result_class = $result ? "hit" : "miss";
            $currentTime = date("G:i:s");
            $completionTime = microtime(true) - $startTime;

            echo "<td>$x</td>\r\n<td>$y</td>\r\n<td>$r</td>\r\n<td class=\"$result_class\">$result_string</td>\r\n<td>$completionTime</td>\r\n<td>$currentTime GMT</td>\r\n";
            ?>
        </tr>
        </tbody>
    </table>
</body>

</html>