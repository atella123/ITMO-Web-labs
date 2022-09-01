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
            include 'php-functions.php';

            $startTime = microtime(true);
            $x = $_GET["x"];
            $y = $_GET["y"];
            $r = $_GET["r"];
            
            if (filter_var($x, FILTER_VALIDATE_FLOAT) === false) {
                header(":", true, 400);
                exit();
            }

            const X_VALUES = array(-3, -2, -1, 0, 1, 2, 3, 4, 5);
            if (!in_array($x, X_VALUES)) {
                header(":", true, 400);
                exit();
            }

            if (filter_var($y, FILTER_VALIDATE_FLOAT) === false) {
                header(":", true, 400);
                exit();
            }

            if ($y < -3 || $y > 5) {
                header(":", true, 400);
                exit();
            }

            if (filter_var($r, FILTER_VALIDATE_FLOAT) === false) {
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

            echo "<td>$x</td>\r\n<td>$y</td>\r\n<td>$r</td>\r\n<td class=\"$result_class\">$result_string</td>\r\n<td>$completionTime</td>\r\n<td>$currentTime GMT</td>\r\n"
            ?>
        </tr>
        </tbody>
    </table>
</body>

</html>