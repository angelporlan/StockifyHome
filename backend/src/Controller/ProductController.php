<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\House;
use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/product', name: 'api_product_')]
class ProductController extends AbstractController
{
    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $products = $em->getRepository(Product::class)->findAll();
        $productArray = array_map(fn($product) => [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'image' => $product->getImage(),
            'house_id' => $product->getHouseId()?->getId(),
            'category_id' => $product->getCategoryId()?->getId(),
            'details' => count($product->getProductDetails())
        ], $products);
        
        return $this->json($productArray);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(Product $product): JsonResponse
    {
        return $this->json([
            'id' => $product->getId(),
            'name' => $product->getName(),
            'image' => $product->getImage(),
            'house_id' => $product->getHouseId()?->getId(),
            'category_id' => $product->getCategoryId()?->getId(),
            'details' => array_map(fn($detail) => $detail->getId(), $product->getProductDetails()->toArray())
        ]);
    }

    #[Route('/', name: 'create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['name']) || empty($data['house_id']) || empty($data['category_id'])) {
            return $this->json(['error' => 'Name, house_id, and category_id are required'], 400);
        }

        $house = $em->getRepository(House::class)->find($data['house_id']);
        $category = $em->getRepository(Category::class)->find($data['category_id']);

        if (!$house || !$category) {
            return $this->json(['error' => 'House or category not found'], 404);
        }

        $product = new Product();
        $product->setName($data['name']);
        $product->setImage($data['image'] ?? null);
        $product->setHouseId($house);
        $product->setCategoryId($category);

        $em->persist($product);
        $em->flush();

        return $this->json(['message' => 'Product created', 'id' => $product->getId()], 201);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Request $request, Product $product, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!empty($data['name'])) {
            $product->setName($data['name']);
        }

        if (isset($data['image'])) {
            $product->setImage($data['image']);
        }

        if (!empty($data['house_id'])) {
            $house = $em->getRepository(House::class)->find($data['house_id']);
            if (!$house) {
                return $this->json(['error' => 'House not found'], 404);
            }
            $product->setHouseId($house);
        }

        if (!empty($data['category_id'])) {
            $category = $em->getRepository(Category::class)->find($data['category_id']);
            if (!$category) {
                return $this->json(['error' => 'Category not found'], 404);
            }
            $product->setCategoryId($category);
        }

        $em->flush();

        return $this->json(['message' => 'Product updated', 'id' => $product->getId()]);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Product $product, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($product);
        $em->flush();

        return $this->json(['message' => 'Product deleted']);
    }
}
