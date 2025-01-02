<?php

namespace App\Controller;

use App\Entity\ProductDetail;
use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/product-detail', name: 'api_product_detail_')]
class ProductDetailController extends AbstractController
{
    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $details = $em->getRepository(ProductDetail::class)->findAll();
        $detailArray = array_map(fn($detail) => [
            'id' => $detail->getId(),
            'quantity' => $detail->getQuantity(),
            'expiration_date' => $detail->getExpirationDate()->format('Y-m-d'),
            'product_id' => $detail->getProductId()?->getId()
        ], $details);

        return $this->json($detailArray);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(ProductDetail $productDetail): JsonResponse
    {
        return $this->json([
            'id' => $productDetail->getId(),
            'quantity' => $productDetail->getQuantity(),
            'expiration_date' => $productDetail->getExpirationDate()->format('Y-m-d'),
            'product_id' => $productDetail->getProductId()?->getId()
        ]);
    }

    #[Route('/', name: 'create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['quantity']) || empty($data['expiration_date']) || empty($data['product_id'])) {
            return $this->json(['error' => 'Quantity, expiration_date, and product_id are required'], 400);
        }

        $product = $em->getRepository(Product::class)->find($data['product_id']);
        if (!$product) {
            return $this->json(['error' => 'Product not found'], 404);
        }

        $detail = new ProductDetail();
        $detail->setQuantity($data['quantity']);
        $detail->setExpirationDate(new \DateTime($data['expiration_date']));
        $detail->setProductId($product);

        $em->persist($detail);
        $em->flush();

        return $this->json(['message' => 'Product detail created', 'id' => $detail->getId()], 201);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Request $request, ProductDetail $productDetail, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!empty($data['quantity'])) {
            $productDetail->setQuantity($data['quantity']);
        }
        if (!empty($data['expiration_date'])) {
            $productDetail->setExpirationDate(new \DateTime($data['expiration_date']));
        }
        if (!empty($data['product_id'])) {
            $product = $em->getRepository(Product::class)->find($data['product_id']);
            if (!$product) {
                return $this->json(['error' => 'Product not found'], 404);
            }
            $productDetail->setProductId($product);
        }

        $em->flush();

        return $this->json(['message' => 'Product detail updated', 'id' => $productDetail->getId()]);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(ProductDetail $productDetail, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($productDetail);
        $em->flush();

        return $this->json(['message' => 'Product detail deleted']);
    }
}
