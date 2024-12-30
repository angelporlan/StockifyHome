<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;

#[Route('/api/user', name: 'api_user_')]
class UserController extends AbstractController
{
    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $users = $em->getRepository(User::class)->findAll();
        $userArray = array_map(fn($user) => $user->toArray(), $users);
        return $this->json($userArray);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(User $user): JsonResponse
    {
        return $this->json($user->toArray());
    }

    #[Route('/', name: 'create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $existingUserByEmail = $em->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        $existingUserByUsername = $em->getRepository(User::class)->findOneBy(['username' => $data['username']]);

        if ($existingUserByEmail) {
            return $this->json(['error' => 'Email is already in use'], 400);
        }

        if ($existingUserByUsername) {
            return $this->json(['error' => 'Username is already in use'], 400);
        }

        $user = new User();
        $user->setEmail($data['email']);
        $user->setPassword($data['password']);  
        $user->setUsername($data['username']);
        $em->persist($user);
        $em->flush();

        return $this->json($user->toArray(), 201);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Request $request, User $user, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $existingUserByEmail = $em->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        $existingUserByUsername = $em->getRepository(User::class)->findOneBy(['username' => $data['username']]);

        if ($existingUserByEmail && $existingUserByEmail !== $user) {
            return $this->json(['error' => 'Email is already in use'], 400);
        }

        if ($existingUserByUsername && $existingUserByUsername !== $user) {
            return $this->json(['error' => 'Username is already in use'], 400);
        }

        $user->setEmail($data['email'] ?? $user->getEmail());
        $user->setPassword($data['password'] ?? $user->getPassword());
        $user->setUsername($data['username'] ?? $user->getUsername());
        $em->flush();

        return $this->json($user->toArray());
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(User $user, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($user);
        $em->flush();

        return $this->json(['message' => 'User deleted']);
    }
}
