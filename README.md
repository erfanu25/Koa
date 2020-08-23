# Phonebook (KoaJS)

Used NodeJS framework(KoaJS) and mysql database

**DataBase Schema**
--
-- Database: `phonebook`
--
CREATE DATABASE IF NOT EXISTS `phonebook` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `phonebook`;

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `phoneNumber` text NOT NULL,
  `address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

**To run:**
npm install
npm run



**Commands**

npm init -y \
npm i koa  \
npm i koa-json  \
npm i koa-router  \
npm i koa-ejs  \
npm i koa-bodyparser  

npm i -D nodemon  \ 

to run: \
npm start  \
browse: http://localhost:3000/

