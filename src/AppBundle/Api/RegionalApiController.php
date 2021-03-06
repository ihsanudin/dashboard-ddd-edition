<?php

namespace AppBundle\Api;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use AppBundle\Chart\Chart;

/**
 * @Route("/regional")
 **/
class RegionalApiController extends  Controller
{
    /**
     * @Route("/get_like/{query}/")
     *
     * @param string $query
     */
    public function getLikeAction($query)
    {
        $regionalFactory = $this->container->get('app.regional.factory');
        return new JsonResponse($regionalFactory->getDataForAutoComplete(strtoupper($query)));
    }
}