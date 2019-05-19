<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="pictureOfEvent">
                <h2 class="jh-entity-heading"><span>PictureOfEvent</span> {{pictureOfEvent.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Pic Date</span>
                    </dt>
                    <dd>
                        <span>{{pictureOfEvent.picDate}}</span>
                    </dd>
                    <dt>
                        <span>Img File</span>
                    </dt>
                    <dd>
                        <div v-if="pictureOfEvent.imgFile">
                            <a v-on:click="openFile(pictureOfEvent.imgFileContentType, pictureOfEvent.imgFile)">
                                <img v-bind:src="'data:' + pictureOfEvent.imgFileContentType + ';base64,' + pictureOfEvent.imgFile" style="max-width: 100%;" alt="pictureOfEvent image"/>
                            </a>
                            {{pictureOfEvent.imgFileContentType}}, {{byteSize(pictureOfEvent.imgFile)}}
                        </div>
                    </dd>
                    <dt>
                        <span>Event PM</span>
                    </dt>
                    <dd>
                        <div v-if="pictureOfEvent.eventPM">
                            <router-link :to="{name: 'EventOfPlateMillView', params: {eventPMId: pictureOfEvent.eventPM.id}}">{{pictureOfEvent.eventPM.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="pictureOfEvent.id" :to="{name: 'PictureOfEventEdit', params: {pictureOfEventId: pictureOfEvent.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./picture-of-event-details.component.ts">
</script>
