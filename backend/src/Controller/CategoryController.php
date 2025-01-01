<?php

namespace App\Controller;

use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/category', name: 'api_category_')]
class CategoryController extends AbstractController
{
    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $categories = $em->getRepository(Category::class)->findAll();
        $categoryArray = array_map(fn($category) => [
            'id' => $category->getId(),
            'name' => $category->getName(),
            'products' => count($category->getProducts())
        ], $categories);
        
        return $this->json($categoryArray);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(Category $category): JsonResponse
    {
        return $this->json([
            'id' => $category->getId(),
            'name' => $category->getName(),
            'products' => array_map(fn($product) => $product->getId(), $category->getProducts()->toArray())
        ]);
    }

    #[Route('/', name: 'create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['name'])) {
            return $this->json(['error' => 'Name is required'], 400);
        }

        $category = new Category();
        $category->setName($data['name']);

        $em->persist($category);
        $em->flush();

        return $this->json(['message' => 'Category created', 'id' => $category->getId()], 201);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Request $request, Category $category, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!empty($data['name'])) {
            $category->setName($data['name']);
        }

        $em->flush();

        return $this->json(['message' => 'Category updated', 'id' => $category->getId()]);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Category $category, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($category);
        $em->flush();

        return $this->json(['message' => 'Category deleted']);
    }
}
