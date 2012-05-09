<?php
shell_exec("pngcrush -rem alla -brute -reduce subzero-beinghit.png subzero-beinghit-opti.png");
echo base64_encode(file_get_contents("subzero-beinghit-opti.png"));
