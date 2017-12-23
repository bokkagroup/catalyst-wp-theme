<?php

use CatalystWP\Atom\controllers\OrganismsController;

//Determine which controller to use
if (is_front_page()) {
    new OrganismsController();
} elseif (is_post_type_archive()) {
} elseif (is_tax()) {
} elseif (is_archive()) {
} elseif (is_single()) {
} elseif (is_category()) {
} elseif (is_404()) {
} elseif (is_page()) {
    new OrganismsController();
} else {
}
