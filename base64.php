<?php
shell_exec("pngcrush -rem alla -brute -reduce subzero-walk.png subzero-walk-opti.png");
echo base64_encode(file_get_contents("subzero-walk-opti.png"));
