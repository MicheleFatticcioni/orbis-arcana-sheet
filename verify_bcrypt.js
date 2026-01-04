const bcrypt = require("bcryptjs");

async function testBcrypt() {
  console.log("Testing bcryptjs...");
  const password = "password123";
  const hash = await bcrypt.hash(password, 10);
  console.log("Hash created:", hash);
  const match = await bcrypt.compare(password, hash);
  console.log("Password match:", match);
  if (match) {
    console.log("SUCCESS: bcryptjs is working correctly.");
  } else {
    console.error("FAILURE: bcryptjs failed to verify password.");
    process.exit(1);
  }
}

testBcrypt();
