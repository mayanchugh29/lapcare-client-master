import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { Instagram } from "@material-ui/icons";
import styles from "../../../styles/componentStyles/InstagramSection.module.css";
import Image from 'next/image';
import axios from 'axios'

const InstagramSection = (props) => {
	const [posts, setposts] = useState([])

	 useEffect(() => {
		 const getInstagramPosts = async()=>{
			const response = await axios.get('https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp,media_id&access_token=IGQVJXRjJ4cGVDYmF2RlpGUmo4ZAGxkcmxRM1EzclY5czhncGo1bjNMX1RHT3ZA5clNfYW1USmhmU1F4NzRHYXJGenAwXzV2TElMbnRqVmFwbEZAfMW5tR1d0M1pTN2owbmdoV01QdTJROXdzd1FNOGtQNQZDZD')
			if(response.status===200){
				response.data.data.map(post=>{
					if(post.media_type!=='VIDEO'){
						setposts(prev=>[...prev,post]);
					}
				})
			}else{
				console.log('Failed to fetch instagram posts')
			}
		 }
		 getInstagramPosts()

	 }, []);

	

	return (
		<div className={styles.mainContainer}>
			<div className={styles.titleContainer}>
				<Typography className={styles.mainTitle}>
					<span style={{ color: "#fcc101", cursor: "pointer", textDecoration: "underline" }}>
						<a href="https://www.instagram.com/lapcareworld/" style={{ textDecoration: "none", color: "inherit" }}>
							.@FOLLOW
						</a>
					</span>{" "}
					US ON
				</Typography>
				<Typography className={styles.subTitle}>Instagram</Typography>
				<div className={styles.imageList}>
					{posts.slice(0,5).map((post ,index)=> (
						<div className={styles.imageDiv} key={index}>
							<Image src={post.media_url} layout="intrinsic" height={250} width={250} alt="Product Image" />
							<a href="https://www.instagram.com/lapcareworld/">
								<div className={styles.overlay}>
									<Instagram className={styles.overlayIcon} />
								</div>
							</a>
						</div>
					))

					}

				</div>
			</div>
		</div>
	);
};

export default InstagramSection;
