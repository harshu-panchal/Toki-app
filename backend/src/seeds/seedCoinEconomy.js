/**
 * Database Seed Script - Initial Coin Plans and Payout Slabs
 * @purpose: Populate database with initial coin economy configuration
 * 
 * Run with: node src/seeds/seedCoinEconomy.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

import CoinPlan from '../models/CoinPlan.js';
import PayoutSlab from '../models/PayoutSlab.js';
import Gift from '../models/Gift.js';

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/toki';

// Seed Data
const coinPlans = [
    {
        name: 'Basic Plan',
        tier: 'basic',
        priceInINR: 99,
        baseCoins: 100,
        bonusCoins: 0,
        totalCoins: 100,
        badge: null,
        isActive: true,
        displayOrder: 1,
        description: 'Perfect for trying out the platform',
    },
    {
        name: 'Silver Plan',
        tier: 'silver',
        priceInINR: 299,
        baseCoins: 300,
        bonusCoins: 30,
        totalCoins: 330,
        badge: null,
        isActive: true,
        displayOrder: 2,
        description: 'Great value with 10% bonus coins',
    },
    {
        name: 'Gold Plan',
        tier: 'gold',
        priceInINR: 499,
        baseCoins: 500,
        bonusCoins: 100,
        totalCoins: 600,
        badge: 'POPULAR',
        isActive: true,
        displayOrder: 3,
        description: 'Most popular choice with 20% bonus',
    },
    {
        name: 'Platinum Plan',
        tier: 'platinum',
        priceInINR: 999,
        baseCoins: 1000,
        bonusCoins: 500,
        totalCoins: 1500,
        badge: 'BEST_VALUE',
        isActive: true,
        displayOrder: 4,
        description: 'Best value with 50% bonus coins',
    },
];

const payoutSlabs = [
    {
        minCoins: 0,
        maxCoins: 500,
        payoutPercentage: 40,
        displayOrder: 1,
        isActive: true,
    },
    {
        minCoins: 501,
        maxCoins: 1000,
        payoutPercentage: 50,
        displayOrder: 2,
        isActive: true,
    },
    {
        minCoins: 1001,
        maxCoins: 5000,
        payoutPercentage: 60,
        displayOrder: 3,
        isActive: true,
    },
    {
        minCoins: 5001,
        maxCoins: null, // Unlimited
        payoutPercentage: 70,
        displayOrder: 4,
        isActive: true,
    },
];

const gifts = [
    {
        name: 'Rose',
        category: 'romantic',
        imageUrl: '/assets/gifts/rose.png',
        cost: 50,
        description: 'A beautiful red rose',
        isActive: true,
        displayOrder: 1,
    },
    {
        name: 'Heart',
        category: 'romantic',
        imageUrl: '/assets/gifts/heart.png',
        cost: 100,
        description: 'Show your love',
        isActive: true,
        displayOrder: 2,
    },
    {
        name: 'Teddy Bear',
        category: 'romantic',
        imageUrl: '/assets/gifts/teddy.png',
        cost: 200,
        description: 'A cuddly teddy bear',
        isActive: true,
        displayOrder: 3,
    },
    {
        name: 'Diamond Ring',
        category: 'special',
        imageUrl: '/assets/gifts/ring.png',
        cost: 500,
        description: 'Premium diamond ring',
        isActive: true,
        displayOrder: 4,
    },
    {
        name: 'Bouquet',
        category: 'celebration',
        imageUrl: '/assets/gifts/bouquet.png',
        cost: 300,
        description: 'Beautiful flower bouquet',
        isActive: true,
        displayOrder: 5,
    },
    {
        name: 'Cake',
        category: 'celebration',
        imageUrl: '/assets/gifts/cake.png',
        cost: 150,
        description: 'Sweet celebration cake',
        isActive: true,
        displayOrder: 6,
    },
    {
        name: 'Thumbs Up',
        category: 'appreciation',
        imageUrl: '/assets/gifts/thumbsup.png',
        cost: 25,
        description: 'Show appreciation',
        isActive: true,
        displayOrder: 7,
    },
    {
        name: 'Laughing Emoji',
        category: 'funny',
        imageUrl: '/assets/gifts/laugh.png',
        cost: 30,
        description: 'Share a laugh',
        isActive: true,
        displayOrder: 8,
    },
];

async function seedDatabase() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Seed Coin Plans
        console.log('\n📦 Seeding Coin Plans...');
        const existingPlans = await CoinPlan.countDocuments();
        if (existingPlans > 0) {
            console.log(`   ⚠️  Found ${existingPlans} existing coin plans. Skipping...`);
        } else {
            await CoinPlan.insertMany(coinPlans);
            console.log(`   ✅ Created ${coinPlans.length} coin plans`);
        }

        // Seed Payout Slabs
        console.log('\n📊 Seeding Payout Slabs...');
        const existingSlabs = await PayoutSlab.countDocuments();
        if (existingSlabs > 0) {
            console.log(`   ⚠️  Found ${existingSlabs} existing payout slabs. Skipping...`);
        } else {
            await PayoutSlab.insertMany(payoutSlabs);
            console.log(`   ✅ Created ${payoutSlabs.length} payout slabs`);
        }

        // Seed Gifts
        console.log('\n🎁 Seeding Gifts...');
        const existingGifts = await Gift.countDocuments();
        if (existingGifts > 0) {
            console.log(`   ⚠️  Found ${existingGifts} existing gifts. Skipping...`);
        } else {
            await Gift.insertMany(gifts);
            console.log(`   ✅ Created ${gifts.length} gifts`);
        }

        console.log('\n🎉 Database seeding completed successfully!\n');

        // Display summary
        console.log('📋 Summary:');
        console.log(`   Coin Plans: ${await CoinPlan.countDocuments()}`);
        console.log(`   Payout Slabs: ${await PayoutSlab.countDocuments()}`);
        console.log(`   Gifts: ${await Gift.countDocuments()}`);

    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from MongoDB');
        process.exit(0);
    }
}

// Run the seed
seedDatabase();
