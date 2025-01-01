<?php

namespace App\Controller;

use App\Entity\House;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/house', name: 'api_house_')]
class HouseController extends AbstractController
{
    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $houses = $em->getRepository(House::class)->findAll();
        $houseArray = array_map(fn($house) => [
            'id' => $house->getId(),
            'name' => $house->getName(),
            'user_id' => $house->getUserId()?->getId(),
            'products' => count($house->getProducts())
        ], $houses);
        
        return $this->json($houseArray);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(House $house): JsonResponse
    {
        return $this->json([
            'id' => $house->getId(),
            'name' => $house->getName(),
            'user_id' => $house->getUserId()?->getId(),
            'products' => array_map(fn($product) => $product->getId(), $house->getProducts()->toArray())
        ]);
    }

    #[Route('/', name: 'create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['name']) || empty($data['user_id'])) {
            return $this->json(['error' => 'Name and user_id are required'], 400);
        }

        $user = $em->getRepository(User::class)->find($data['user_id']);
        if (!$user) {
            return $this->json(['error' => 'User not found'], 404);
        }

        $house = new House();
        $house->setName($data['name']);
        $house->setUserId($user);

        $em->persist($house);
        $em->flush();

        return $this->json(['message' => 'House created', 'id' => $house->getId()], 201);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Request $request, House $house, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!empty($data['name'])) {
            $house->setName($data['name']);
        }

        if (!empty($data['user_id'])) {
            $user = $em->getRepository(User::class)->find($data['user_id']);
            if (!$user) {
                return $this->json(['error' => 'User not found'], 404);
            }
            $house->setUserId($user);
        }

        $em->flush();

        return $this->json(['message' => 'House updated', 'id' => $house->getId()]);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(House $house, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($house);
        $em->flush();

        return $this->json(['message' => 'House deleted']);
    }
}
