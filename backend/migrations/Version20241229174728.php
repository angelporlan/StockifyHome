<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241229174728 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE house (id INT AUTO_INCREMENT NOT NULL, user_id_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_67D5399D9D86650F (user_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE product (id INT AUTO_INCREMENT NOT NULL, house_id_id INT NOT NULL, category_id_id INT NOT NULL, name VARCHAR(255) NOT NULL, image LONGTEXT DEFAULT NULL, INDEX IDX_D34A04ADA4A739AF (house_id_id), INDEX IDX_D34A04AD9777D11E (category_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE product_detail (id INT AUTO_INCREMENT NOT NULL, product_id_id INT NOT NULL, quantity INT NOT NULL, expiration_date DATE NOT NULL, INDEX IDX_4C7A3E37DE18E50B (product_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE house ADD CONSTRAINT FK_67D5399D9D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04ADA4A739AF FOREIGN KEY (house_id_id) REFERENCES house (id)');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD9777D11E FOREIGN KEY (category_id_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE product_detail ADD CONSTRAINT FK_4C7A3E37DE18E50B FOREIGN KEY (product_id_id) REFERENCES product (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE house DROP FOREIGN KEY FK_67D5399D9D86650F');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04ADA4A739AF');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04AD9777D11E');
        $this->addSql('ALTER TABLE product_detail DROP FOREIGN KEY FK_4C7A3E37DE18E50B');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE house');
        $this->addSql('DROP TABLE product');
        $this->addSql('DROP TABLE product_detail');
        $this->addSql('DROP TABLE user');
    }
}
