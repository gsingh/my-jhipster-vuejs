<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="videoOfEvent">
                <h2 class="jh-entity-heading"><span>VideoOfEvent</span> {{videoOfEvent.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Video Date</span>
                    </dt>
                    <dd>
                        <span>{{videoOfEvent.videoDate}}</span>
                    </dd>
                    <dt>
                        <span>Video File</span>
                    </dt>
                    <dd>
                        <div v-if="videoOfEvent.videoFile">
                            <a v-on:click="openFile(videoOfEvent.videoFileContentType, videoOfEvent.videoFile)">
                             <video v-bind:width="byteSize(videoOfEvent.videoFile)/150" v-bind:height="byteSize(videoOfEvent.videoFile)/225" controls>
                             <source v-bind:src="'data:video/' + videoOfEvent.videoFileContentType + ';base64,' + videoOfEvent.videoFile" v-bind:type="videoOfEvent.videoFileContentType" >
                             </video>
  <!--source src="Video0008.3gp'" type="video/3gpp"-->  
                            </a>
                            {{videoOfEvent.videoFileContentType}}, {{byteSize(videoOfEvent.videoFile)}}
                        </div>
                    </dd>
                    <dt>
                        <span>Event PM</span>
                    </dt>
                    <dd>
                        <div v-if="videoOfEvent.eventPM">
                            <router-link :to="{name: 'EventOfPlateMillView', params: {eventPMId: videoOfEvent.eventPM.id}}">{{videoOfEvent.eventPM.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="videoOfEvent.id" :to="{name: 'VideoOfEventEdit', params: {videoOfEventId: videoOfEvent.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./video-of-event-details.component.ts">
</script>
