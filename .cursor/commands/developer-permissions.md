# Developer Permissions & Authorization Rules

> **CRITICAL**: This file must be referenced at the START of EVERY chat session.
> 
> **MANDATORY FIRST STEP**: Always ask "Who is working: Harsh or Sujal?" before proceeding with ANY implementation.

---

## 🚨 Authorization Protocol

### Step 1: Identify Developer
**MANDATORY**: At the start of every chat, you MUST ask:
```
"Who is working: Harsh or Sujal?"
```

### Step 2: Enforce Rules
Once the developer is identified, proceed ONLY with authorized changes according to the rules below.

### Step 3: Stop if Unauthorized
**If a developer requests changes outside their scope:**
1. ⚠️ **STOP immediately**
2. Display a clear warning message
3. Do NOT proceed with implementation
4. Explain what they're authorized to do instead

---

## 👤 HARSH - Authorized Scope

### ✅ HARSH CAN DO (Backend & Frontend):

#### Backend:
1. **Chat/Messaging Logic**
   - Real-time messaging implementation (Socket.IO)
   - Message sending/receiving logic
   - Chat conversation management
   - Message delivery & read receipts
   - Typing indicators
   - Chat-related Socket.IO events

2. **Coin Management (Chat-Related Only)**
   - Coin deduction from Male user when sending messages
   - Coin addition to Female user when receiving messages
   - Coin deduction for video calls (500 coins)
   - Coin deduction for gifts
   - Coin management within chat flow only

3. **Video Call Logic**
   - Video call initiation
   - Video call signaling (Socket.IO)
   - Video call connection management
   - Video call-related coin deduction

4. **Gift System Logic**
   - Gift sending/receiving
   - Gift-related coin deduction
   - Gift message handling

#### Frontend:
1. **Chat Components (Male & Female)**
   - `ChatListPage.tsx` (both male and female)
   - `ChatWindowPage.tsx` (both male and female)
   - Chat-related components:
     - `MessageBubble.tsx`
     - `MessageInput.tsx`
     - `ChatWindowHeader.tsx`
     - `ChatListItem.tsx`
     - `ChatListHeader.tsx`
     - `ChatMoreOptionsModal.tsx`
     - `ActiveChatsList.tsx`
     - `GiftMessageBubble.tsx`
     - `GiftCarouselViewer.tsx`
     - `ChatGiftSelectorModal.tsx`

2. **Chat Services**
   - Chat API integration
   - Socket.IO client integration
   - Real-time message handling
   - Chat-related state management

#### Backend Files (Harsh's Domain):
```
backend/src/
├── routes/chat/              ✅ HARSH ONLY
├── controllers/chat/         ✅ HARSH ONLY
├── services/chat/             ✅ HARSH ONLY
├── socket/                    ✅ HARSH ONLY
├── models/Chat.js             ✅ HARSH ONLY
├── models/Message.js          ✅ HARSH ONLY
└── models/ChatParticipant.js ✅ HARSH ONLY
```

#### Frontend Files (Harsh's Domain):
```
frontend/src/module/
├── male/pages/
│   ├── ChatListPage.tsx       ✅ HARSH ONLY
│   └── ChatWindowPage.tsx     ✅ HARSH ONLY
├── male/components/
│   ├── MessageBubble.tsx      ✅ HARSH ONLY
│   ├── MessageInput.tsx       ✅ HARSH ONLY
│   ├── ChatWindowHeader.tsx   ✅ HARSH ONLY
│   ├── ChatListItem.tsx       ✅ HARSH ONLY
│   ├── ChatListHeader.tsx     ✅ HARSH ONLY
│   ├── ChatMoreOptionsModal.tsx ✅ HARSH ONLY
│   ├── ActiveChatsList.tsx   ✅ HARSH ONLY
│   ├── GiftMessageBubble.tsx ✅ HARSH ONLY
│   ├── GiftCarouselViewer.tsx ✅ HARSH ONLY
│   └── ChatGiftSelectorModal.tsx ✅ HARSH ONLY
├── female/pages/
│   ├── ChatListPage.tsx       ✅ HARSH ONLY
│   └── ChatWindowPage.tsx     ✅ HARSH ONLY
└── female/components/
    ├── MessageBubble.tsx      ✅ HARSH ONLY
    ├── MessageInput.tsx       ✅ HARSH ONLY
    ├── ChatWindowHeader.tsx   ✅ HARSH ONLY
    ├── ChatListItem.tsx      ✅ HARSH ONLY
    ├── ChatListHeader.tsx     ✅ HARSH ONLY
    ├── ChatMoreOptionsModal.tsx ✅ HARSH ONLY
    ├── ActiveChatsList.tsx   ✅ HARSH ONLY
    ├── GiftMessageBubble.tsx ✅ HARSH ONLY
    └── GiftCarouselViewer.tsx ✅ HARSH ONLY
```

### ❌ HARSH CANNOT DO:
- Authentication & Authorization (login, signup, JWT)
- Wallet management (outside chat flow)
- Payment processing (Razorpay integration)
- Coin purchase flows
- Earnings calculation (outside chat context)
- Withdrawal management
- Admin panel features
- Profile management
- User discovery/search
- Transaction history (non-chat related)
- Any feature outside chat/messaging/gifts/video calls

---

## 👤 SUJAL - Authorized Scope

### ✅ SUJAL CAN DO (Backend & Frontend):

#### Backend:
1. **Authentication & Authorization**
   - User registration
   - Login/logout
   - JWT token management
   - Password reset
   - Email verification
   - Role-based access control

2. **User Management**
   - User CRUD operations
   - Profile management
   - User verification
   - User blocking/unblocking

3. **Wallet & Coin Economy**
   - Wallet balance management
   - Coin purchase flows
   - Coin plan management
   - Transaction history (non-chat)
   - Coin balance queries

4. **Payment Processing**
   - Razorpay integration
   - Payment gateway setup
   - Payment verification
   - Refund processing

5. **Earnings System**
   - Earnings calculation
   - Earnings tracking
   - Payout slab management
   - Earnings history

6. **Withdrawal Management**
   - Withdrawal request processing
   - Withdrawal approval/rejection
   - Payment processing for withdrawals

7. **Admin Panel**
   - Admin dashboard
   - User management
   - Female approval workflow
   - Coin economy management
   - Withdrawal management
   - Transaction monitoring
   - Settings management
   - Audit logs

8. **Profile & Discovery**
   - Profile CRUD
   - Profile search/discovery
   - Location-based discovery
   - Profile filtering

9. **Notifications**
   - Notification system (non-chat)
   - Email notifications
   - Push notifications

#### Frontend:
1. **All Pages EXCEPT Chat Pages**
   - Authentication pages (Login, Signup, Profile Setup)
   - Male Dashboard (excluding chat sections)
   - Female Dashboard (excluding chat sections)
   - Wallet pages
   - Coin purchase pages
   - Earnings pages
   - Withdrawal pages
   - Admin pages
   - Profile pages
   - Discovery pages
   - Notification pages (non-chat)

2. **All Components EXCEPT Chat Components**
   - All navigation components
   - Wallet components
   - Payment components
   - Profile components
   - Admin components
   - Dashboard components (non-chat)

#### Backend Files (Sujal's Domain):
```
backend/src/
├── routes/auth/              ✅ SUJAL ONLY
├── routes/male/              ✅ SUJAL ONLY (except chat routes)
├── routes/female/            ✅ SUJAL ONLY (except chat routes)
├── routes/admin/             ✅ SUJAL ONLY
├── controllers/auth/         ✅ SUJAL ONLY
├── controllers/male/         ✅ SUJAL ONLY (except chat controllers)
├── controllers/female/       ✅ SUJAL ONLY (except chat controllers)
├── controllers/admin/        ✅ SUJAL ONLY
├── services/wallet/          ✅ SUJAL ONLY
├── services/payment/         ✅ SUJAL ONLY
├── services/earnings/        ✅ SUJAL ONLY
├── services/withdrawal/      ✅ SUJAL ONLY
├── services/admin/           ✅ SUJAL ONLY
├── models/User.js            ✅ SUJAL ONLY (base model)
├── models/Transaction.js     ✅ SUJAL ONLY
├── models/CoinPlan.js        ✅ SUJAL ONLY
├── models/Withdrawal.js      ✅ SUJAL ONLY
└── models/AuditLog.js        ✅ SUJAL ONLY
```

#### Frontend Files (Sujal's Domain):
```
frontend/src/module/
├── auth/                     ✅ SUJAL ONLY
├── admin/                    ✅ SUJAL ONLY
├── male/pages/
│   ├── MaleDashboard.tsx     ✅ SUJAL ONLY (excluding chat sections)
│   ├── NearbyFemalesPage.tsx ✅ SUJAL ONLY
│   ├── WalletPage.tsx        ✅ SUJAL ONLY
│   ├── CoinPurchasePage.tsx  ✅ SUJAL ONLY
│   ├── PaymentPage.tsx       ✅ SUJAL ONLY
│   ├── PurchaseHistoryPage.tsx ✅ SUJAL ONLY
│   ├── UserProfilePage.tsx   ✅ SUJAL ONLY
│   ├── MyProfilePage.tsx     ✅ SUJAL ONLY
│   └── NotificationsPage.tsx ✅ SUJAL ONLY
├── female/pages/
│   ├── FemaleDashboard.tsx   ✅ SUJAL ONLY (excluding chat sections)
│   ├── EarningsPage.tsx      ✅ SUJAL ONLY
│   ├── WithdrawalPage.tsx    ✅ SUJAL ONLY
│   ├── AutoMessageTemplatesPage.tsx ✅ SUJAL ONLY
│   ├── MyProfilePage.tsx     ✅ SUJAL ONLY
│   ├── NotificationsPage.tsx ✅ SUJAL ONLY
│   └── UserProfilePage.tsx   ✅ SUJAL ONLY
└── All components EXCEPT chat-related components ✅ SUJAL ONLY
```

### ❌ SUJAL CANNOT DO:
- Chat/messaging logic implementation
- Real-time messaging (Socket.IO)
- Message sending/receiving logic
- Chat conversation management
- Video call logic
- Gift system logic
- Chat-related coin deduction/addition (within chat flow)
- Chat components (MessageBubble, MessageInput, ChatWindow, etc.)
- Socket.IO implementation

---

## 🔄 Shared/Review Required

### Files Requiring Both Developers' Review:
1. **Database Models** (when adding new fields)
   - `models/User.js` - If adding chat-related fields (Harsh) or wallet-related fields (Sujal)
   - Any model changes affecting both domains

2. **Middleware**
   - `middleware/auth.js` - Authentication middleware
   - `middleware/roleCheck.js` - Role-based access

3. **Config Files**
   - `config/database.js` - Database configuration
   - `config/razorpay.js` - Payment configuration
   - `.env` files

4. **API Response Formatting**
   - Shared response utilities
   - Error handling utilities

### Protocol for Shared Files:
1. Create a feature branch
2. Make minimal, focused changes
3. Create PR with clear description
4. **MANDATORY**: Other developer MUST review before merge
5. Use comments to explain why change is needed
6. Merge only after approval

---

## ⚠️ Warning Messages

### If Harsh Requests Unauthorized Change:
```
⚠️ AUTHORIZATION WARNING ⚠️

You (Harsh) are NOT authorized to make changes to:
- [Specific feature/file requested]

Your authorized scope is LIMITED to:
- Chat/messaging logic (backend & frontend)
- Video call logic
- Gift system logic
- Chat-related coin management (within chat flow only)

Please contact Sujal for implementation of this feature, or request a review if this is a shared component.

STOPPING IMPLEMENTATION.
```

### If Sujal Requests Unauthorized Change:
```
⚠️ AUTHORIZATION WARNING ⚠️

You (Sujal) are NOT authorized to make changes to:
- [Specific feature/file requested]

Your authorized scope EXCLUDES:
- Chat/messaging logic (backend & frontend)
- Video call logic
- Gift system logic
- Chat-related coin management (within chat flow)

This feature is owned by Harsh. Please contact Harsh for implementation, or request a review if this is a shared component.

STOPPING IMPLEMENTATION.
```

---

## 📋 Quick Reference Checklist

### Before Starting ANY Implementation:
- [ ] Asked "Who is working: Harsh or Sujal?"
- [ ] Identified the developer
- [ ] Verified the requested changes are within their scope
- [ ] If outside scope, displayed warning and STOPPED

### For Harsh:
- [ ] Is this related to chat/messaging? ✅
- [ ] Is this related to video calls? ✅
- [ ] Is this related to gifts? ✅
- [ ] Is this chat-related coin management? ✅
- [ ] If NO to all above → STOP ⛔

### For Sujal:
- [ ] Is this related to chat/messaging? ⛔
- [ ] Is this related to video calls? ⛔
- [ ] Is this related to gifts? ⛔
- [ ] Is this chat-related coin management? ⛔
- [ ] If YES to any above → STOP ⛔

---

## 🎯 Integration Points

### Where Harsh & Sujal Must Collaborate:

1. **Coin Deduction on Message Send**
   - Harsh: Implements message sending logic
   - Sujal: Provides wallet service function for coin deduction
   - Integration: Harsh calls Sujal's function

2. **Coin Addition on Message Receive**
   - Harsh: Implements message receiving logic
   - Sujal: Provides earnings service function for coin addition
   - Integration: Harsh calls Sujal's function

3. **Video Call Coin Deduction**
   - Harsh: Implements video call initiation
   - Sujal: Provides wallet service function
   - Integration: Harsh calls Sujal's function

4. **Transaction Creation**
   - Harsh: Triggers transaction creation during chat actions
   - Sujal: Provides transaction service function
   - Integration: Harsh calls Sujal's function

### Collaboration Protocol:
1. Developer needing integration creates an issue/request
2. Other developer implements the required function/service
3. First developer uses the function in their code
4. Both test the integration together

---

## 📝 Notes

- **This file is MANDATORY** - Cursor must reference it at the start of every chat
- **No exceptions** - Authorization rules are strictly enforced
- **Review required** - Shared files need both developers' approval
- **Communication is key** - Use issues/PRs for cross-feature requests

---

**Last Updated**: 2024-01-15
**Version**: 1.0.0
**Status**: Active

